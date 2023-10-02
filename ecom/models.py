from statistics import mode
from django.db import models
from autoslug import AutoSlugField
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User 
import uuid

# Create your models here.

class HomeSlider(models.Model):
    image = models.ImageField(upload_to="images/HomeSlider/",blank=True,null=True)
    category_name = models.CharField(max_length=255,blank=True,null=True)
    tilte = models.CharField(max_length=255,blank=True,null=True)
    content = models.CharField(max_length=55,blank=True,null=True)
    discount_price = models.CharField(max_length=255,blank=True,null=True)
    current_price = models.CharField(max_length=255,blank=True,null=True)
    link = models.CharField(max_length=255,blank=True,null=True)
    
    def __str__(self):
        return self.tilte

class HomeFour(models.Model):
    category_name = models.CharField(max_length=255,blank=True,null=True)
    content = models.CharField(max_length=55,blank=True,null=True)
    image = models.ImageField(upload_to="images/Four/",blank=True,null=True)
    
    def __str__(self):
        return self.category_name
    
class HomeFour(models.Model):
    category_name = models.CharField(max_length=255,blank=True,null=True)
    content = models.CharField(max_length=55,blank=True,null=True)
    image = models.ImageField(upload_to="images/Four/",blank=True,null=True)
    
    def __str__(self):
        return self.category_name
    
class Category(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to="images/Category/")
    slug = AutoSlugField(populate_from='name')
    parent = models.ForeignKey('self',blank=True, null=True ,related_name='children',on_delete=models.CASCADE)

    class Meta:
        unique_together = ('slug', 'parent',)    
        verbose_name_plural = "categories"     

    def __str__(self):                           
        full_path = [self.name]                  
        k = self.parent
        while k is not None:
            full_path.append(k.name)
            k = k.parent
        return ' -> '.join(full_path[::-1])


class Product(models.Model):
    title = models.CharField(max_length=255)
    short_title = models.CharField(max_length=120,blank=True,null=True)
    category = models.ForeignKey(Category, null=True, blank=True,on_delete=models.CASCADE)
    image_1 = models.ImageField(upload_to="images/Product/")
    image_2 = models.ImageField(upload_to="images/Product/")
    image_3 = models.ImageField(upload_to="images/Product/")
    short_Description = RichTextField(blank=True,null=True)
    long_Description = RichTextField(blank=True,null=True)
    discount_price = models.CharField(max_length=55,blank=True,null=True)
    price = models.CharField(max_length=55,blank=True,null=True)
    is_best = models.BooleanField(blank=True,null=True,default=False)
    is_best_selling = models.BooleanField(blank=True,null=True,default=False)
    preview_link = models.CharField(max_length=255,blank=True,null=True)
    download_link = models.CharField(max_length=255,blank=True,null=True)
    seo_keyword = models.CharField(max_length=255,blank=True,null=True)
    seo_description = models.CharField(max_length=255,blank=True,null=True)
    slug = AutoSlugField(populate_from='title')
    created_date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title
    
    def get_cat_list(self):
        k = self.category # for now ignore this instance method
        
        breadcrumb = ["dummy"]
        while k is not None:
            breadcrumb.append(k.slug)
            k = k.parent
        for i in range(len(breadcrumb)-1):
            breadcrumb[i] = '/'.join(breadcrumb[-1:i-1:-1])
        return breadcrumb[-1:0:-1]


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=255,blank=True,null=True)
    email = models.EmailField(blank=True,null=True)
    review = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False,blank=True,null=True)
    
    def __str__(self):
        return self.name
    
    
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(blank=True,null=True)
    price = models.CharField(max_length=50,blank=True,null=True)
    
    def __str__(self):
        return self.price
    
class Customer(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    country = models.CharField(max_length=255,blank=True,null=True)
    first_name = models.CharField(max_length=50,blank=True,null=True)
    last_name = models.CharField(max_length=50,blank=True,null=True)
    company_name = models.CharField(max_length=50,blank=True,null=True)
    address_street = models.CharField(max_length=50,blank=True,null=True)
    address_optional = models.CharField(max_length=50,blank=True,null=True)
    city = models.CharField(max_length=50,blank=True,null=True)
    states = models.CharField(max_length=50,blank=True,null=True)
    zip_code = models.CharField(max_length=50,blank=True,null=True)
    email = models.CharField(max_length=50,blank=True,null=True)
    phone = models.CharField(max_length=50,blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    
class Order(models.Model):
    STATUS_CHOICES = (
        ('Accepted','Accepted'),
        ('Cancel','Cancel'),
    )
    PAYMENT_MODE_STATUS = (
        ('Cash','Cash'),
        ('Online','Online')
    )
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,blank=True,null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order_id = models.UUIDField(default=uuid.uuid4,unique=True)
    quantity = models.PositiveBigIntegerField(default=1)
    ordered_date = models.DateTimeField(auto_now_add=True)
    payment_mode = models.CharField(max_length=255, choices=PAYMENT_MODE_STATUS,default="Pending")
    status = models.CharField(max_length=255,choices=STATUS_CHOICES,default="Pending")
    payment_id = models.CharField(max_length=50,blank=True,null=True)
    
    def __str__(self):
        return str(self.user)
    
    
class Payment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    razorpay_order_id = models.CharField(max_length=50,blank=True,null=True)
    razorpay_payment_id = models.CharField(max_length=50,blank=True,null=True)
    razorpay_signature = models.CharField(max_length=50,blank=True,null=True)
    amount = models.CharField(max_length=50,blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True,blank=True,null=True)