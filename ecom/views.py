from re import search
from django import views
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework import status
from ecom.models import Customer, HomeSlider, HomeFour, Category, Product, Review, Cart,Order,Payment
from ecom.serializer import CustomerSerializer, HomeSliderSerializer, HomeFourSerializer, CategorySerializer, ProductSerializer, CartSerializer, OrderSerializer
from django.views import View
from django.contrib.auth.models import User
import json
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
import razorpay
import requests
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse

# Razorpay
razorpay_client = razorpay.Client(
    auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET)
)

# Generate Token Manually


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# Create your views here.

class HomeSliderView(APIView):
    def get(self, request, format=None):
        snippets = HomeSlider.objects.last()
        serializer = HomeSliderSerializer(snippets)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HomeFourView(APIView):
    def get(self, request, format=None):
        snippets = HomeFour.objects.all().order_by('-id')[:4]
        serializer = HomeFourSerializer(snippets, many=True)
        print(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryView(APIView):
    def get(self, request, format=None):
        snippets = Category.objects.all()
        serializer = CategorySerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductView(APIView):
    def get(self, request, format=None):
        snippets = Product.objects.all().order_by('-id')
        serializer = ProductSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductDetailsView(APIView):
    def post(self, request, format=None):
        slug = request.data.get('slug')
        print(slug)
        snippets = Product.objects.filter(slug=slug).first()
        review = list(Review.objects.filter(product=snippets).values(
            'user', 'product', 'name', 'email', 'review', 'status'))
        review = json.dumps(review)
        print(review)
        serializer = ProductSerializer(snippets)

        return Response({'slug': serializer.data, 'review': review}, status=status.HTTP_200_OK, )


class ReactProductDetailsView(APIView):
    def get(self, request, slug):
        return render(request, "baseecom.html")


class ReactProductView(APIView):
    def get(self, request):
        return redirect('/')


class PriceFilterView(APIView):
    def post(self, request, format=None):
        price = request.data
        snippets = Product.objects.filter(price__range=(0, price))
        serializer = ProductSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryFilterView(APIView):
    def post(self, request, format=None):
        category_name = request.data.get('category_url')
        snippets = Product.objects.filter(category__slug=category_name)
        serializer = ProductSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SearchFilterView(APIView):
    def post(self, request, format=None):
        # Searching Funcitonality
        search = request.data.get('search_url')
        snippets = Product.objects.filter(title__icontains=search)
        serializer = ProductSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ReactCategoryView(APIView):
    def get(self, request, slug, format=None):
        return redirect('/')


class ProductReview(APIView):
    def get(self, request, format=None):
        product_id = request.data.get('product_id')
        product = Product.objects.get(id=product_id)
        snippets = Review.objects.filter(product=product)
        serializer = ProductSerializer(snippets, many=True)
        return Response(serializer.datta, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = User.objects.get(username=request.data['username'])
        product = Product.objects.get(id=request.data['product_id'])
        name = request.data['name']
        email = request.data['email']
        review_msg = request.data['review_msg']
        review = Review(user=user, product=product, name=name,
                        email=email, review=review_msg)
        review.save()
        return Response({'status': "Success", 'message': 'Successfully Reviewed and admin will approve the your review soon'}, status=status.HTTP_200_OK)


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = request.user.id
        username = request.user
        product_id = request.data.get('id')

        product = Product.objects.get(id=product_id)
        price = product.price

        hint = request.data.get('hint')
        cart = Cart.objects.filter(user=username, product=product_id).first()

        queryset = Cart.objects.filter(user=username)
        cart_len = len(queryset)

        if hint == "firstcart":
            if cart is None:
                serializer = CartSerializer(
                    data={'user': user, 'product': product_id, 'quantity': 1, 'price': price})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response({'message': 'Successfully Add This Cart', 'data': serializer.data, 'cart_len': cart_len}, status=status.HTTP_200_OK)
            return Response({'message': 'Already Added', 'cart_len': cart_len}, status=status.HTTP_208_ALREADY_REPORTED)

        elif hint == "decrement-cart":
            if cart is not None:
                if cart.quantity == 1:
                    queryset = Cart.objects.filter(user=username)
                    serializer = CartSerializer(queryset, many=True)
                    return Response({'message': 'You Can not Decrement Cart', 'data': serializer.data, 'cart_len': cart_len}, status=status.HTTP_200_OK)
                else:
                    cart.quantity -= 1
                    cart.save()
                    queryset = Cart.objects.filter(user=username)
                    serializer = CartSerializer(queryset, many=True)
                    return Response({'message': 'Decrement Cart', 'data': serializer.data, 'cart_len': cart_len}, status=status.HTTP_200_OK)
            return Response({'message': 'Something Wrong', 'cart_len': cart_len}, status=status.HTTP_400_BAD_REQUEST)

                    
        elif hint == "increment-cart":
            if cart is not None:
                cart.quantity += 1
                cart.save()
                queryset = Cart.objects.filter(user=username)
                serializer = CartSerializer(queryset, many=True)
                return Response({'message': 'Increment Cart', 'data': serializer.data, 'cart_len': cart_len}, status=status.HTTP_200_OK)
            return Response({'message': 'Something Wrong', 'cart_len': cart_len}, status=status.HTTP_400_BAD_REQUEST)

        elif hint == "remove":
            if cart is not None:
                cart.delete()
                queryset = Cart.objects.filter(user=username)
                serializer = CartSerializer(queryset, many=True)
                return Response({'message': 'Successfully Removed Cart', 'data': serializer.data, 'cart_len': cart_len}, status=status.HTTP_200_OK)
            return Response({'message': 'Already Deleted', 'cart_len': cart_len}, status=status.HTTP_400_BAD_REQUEST)

        else:
            pass

    def get(self, request, format=None):
        username = request.user
        queryset = Cart.objects.filter(user=username)
        cart_len = len(queryset)

        serializer = CartSerializer(queryset, many=True)

        return Response({'status': 'success', 'data': serializer.data, 'cart_len': cart_len})


class MyCartView(APIView):
    def get(self, request, format=None):
        return render(request, "baseecom.html")


class BillingView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request, format=None):
        data = request.data
        
        data['user'] = request.user.id
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            Customer = serializer.save()
            
            
            if data['mode'] == "cash":
                #Cash On Delivery Order            
                cart = Cart.objects.filter(user=request.user)
                for c in cart:
                    Order(user=request.user,customer=Customer,product=c.product,quantity=c.quantity,payment_mode="Cash").save()
                    c.delete()
                #End Cash On Delivery Orderss
                return Response({'message': 'Customer Created Successfully'}, status=status.HTTP_200_OK)
            else:
                amount = 0.0
                shipping_amount = 0.0
                cart_product = Cart.objects.filter(user=request.user)
                product_price = []
                print(cart_product)
                if cart_product:
                    for p in cart_product:
                        product_price.append((float(p.quantity) * float(p.product.price)))
                        tempamount = (float(p.quantity) * float(p.product.price))
                        amount += float(tempamount)
                        totalamount = amount + shipping_amount
                    payment = razorpay_client.order.create({'amount':totalamount*100, 'currency':'INR','payment_capture':'1'})
                    data = {'payment':payment}
                    return JsonResponse(data)
                else:
                    return Response({'message':'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST) 
        return Response({'message':'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)

class PaymentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request, format=None):
        data = request.data
        print(data)
        
        params_dict = {
            'razorpay_order_id': data['razorpay_orderId'],
            'razorpay_payment_id': data['razorpay_paymentId'],
            'razorpay_signature': data['razorpay_signature']
        }
        
        # verify the payment signature.
        result = razorpay_client.utility.verify_payment_signature(params_dict)
        
        amount = float(data['price']/100)
        print("Amount :", amount)
        payment = Payment(user=request.user,razorpay_order_id=data['razorpay_orderId'],razorpay_payment_id=data['razorpay_paymentId'],razorpay_signature=data['razorpay_signature'],amount=amount)
        payment.save()
            
        cart = Cart.objects.filter(user=request.user)
        for c in cart:
            Order(user=request.user,product=c.product,quantity=c.quantity,payment_mode="Online",payment_id=data['razorpay_paymentId']).save()
            c.delete()
        
        return Response({'message':'Successfully Order'}, status=status.HTTP_201_CREATED) 

        

class OrderView(APIView):
    def get(self,request, *args, **kwargs):
        return render(request,'ecom/index.html')

class PlaceOrderView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request, *args, **kwargs):
        snippets = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

def preview(request):
    return render(request,'preview.html')

def error_404_view(request, exception):
	return render(request,'404.html')

