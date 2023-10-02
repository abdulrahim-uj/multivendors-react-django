from django.contrib import admin
from ecom.models import Customer, HomeSlider,HomeFour,Category, \
    Product,Review,Cart,Order,Payment
# Register your models here.

admin.site.register(HomeSlider)
admin.site.register(HomeFour)
admin.site.register(Category)
# admin.site.register(Cart)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title','category','price','created_date')
    ordering = ('title','category','price','created_date')
    search_fields = ('title','category','price','created_date')
    
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user','name','product','status')
    ordering = ('user','name','product','status')
    search_fields = ('user','name','product','status')
    
    
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user','product','price','quantity')
    ordering = ('user','product','price','quantity')
    search_fields = ('user','product','price','quantity')
    
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('user','first_name','last_name','email','phone','created_date')
    # ordering = ('user','first_name','last_name','email','phone','created_date')
    search_fields = ('user','first_name','last_name','email','phone','created_date')
    
    
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user','product','quantity','ordered_date','ordered_date')
    # ordering = ('user','product','quantity','ordered_date','ordered_date')
    search_fields = ('user','product','quantity','ordered_date','ordered_date')
   
    
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user','created_date','razorpay_order_id','amount')
    # ordering = ('user','created_date','razorpay_order_id','razorpay_payment_id','razorpay_signature','amount')
    search_fields = ('user','created_date','razorpay_order_id','razorpay_payment_id','razorpay_signature','amount')
   
    
    
    