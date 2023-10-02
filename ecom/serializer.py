
from statistics import mode
from rest_framework import serializers
from ecom.models import Customer, HomeSlider,HomeFour,Category, Product,Review,Cart,Order
from django.contrib.auth.models import User

class HomeSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeSlider
        fields = '__all__'

class HomeFourSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeFour
        fields = "__all__"



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        

        
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_slug = serializers.CharField(source="category.slug", read_only=True)
   
    class Meta:
        model = Product
        fields = "__all__"
        

        
class CartSerializer(serializers.ModelSerializer):
    product_image = serializers.CharField(source="product.image_1", read_only=True)
    product_title = serializers.CharField(source="product.title", read_only=True)
    product_short_title = serializers.CharField(source="product.short_title", read_only=True)
    product_slug = serializers.CharField(source="product.slug", read_only=True)
   
    class Meta:
        model = Cart
        fields = "__all__"


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
        
        
class OrderSerializer(serializers.ModelSerializer):
    product_short_title = serializers.CharField(source="product.short_title", read_only=True)
    product_download_link = serializers.CharField(source="product.download_link", read_only=True)
    product_preview_link = serializers.CharField(source="product.preview_link", read_only=True)
    class Meta:
        model = Order
        fields = "__all__"