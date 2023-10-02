from django.db import models
from ckeditor.fields import RichTextField
from autoslug import AutoSlugField

# Create your models here.

class WebsiteInfo(models.Model):
    title = models.CharField(max_length=255,blank=True,null=True)
    logo = models.ImageField(upload_to="images/logo/",blank=True,null=True)
    offer_line = models.CharField(max_length=255,blank=True,null=True)
    phone = models.CharField(max_length=255,blank=True,null=True)
    email = models.CharField(max_length=255,blank=True,null=True)
    address = models.TextField(blank=True,null=True)
    copyright = models.CharField(max_length=255,blank=True,null=True)
    facebook = models.CharField(max_length=255,blank=True,null=True)
    twitter = models.CharField(max_length=255,blank=True,null=True)
    instagram = models.CharField(max_length=255,blank=True,null=True)
    youtube = models.CharField(max_length=255,blank=True,null=True)
    
    def __str__(self) -> str:
        return self.title

class Team(models.Model):
    icon = models.ImageField(upload_to="images/",blank=True,null=True)
    name = models.CharField(max_length=255,blank=True,null=True)
    designation = models.CharField(max_length=255,blank=True,null=True)
    
    def __str__(self):
        return self.name
 
class Category(models.Model):
    name = models.CharField(max_length=255,blank=True,null=True)
    icon = models.ImageField(upload_to="images/category/",blank=True,null=True)
    slug = AutoSlugField(populate_from='name',blank=True,null=True)
    
    def __str__(self):
        return self.name



class Blog(models.Model):
    title = models.CharField(max_length=255,blank=True,null=True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    description = RichTextField(blank=True,null=True)
    image = models.ImageField(upload_to="images/blog/",blank=True,null=True)
    seo_keyword = models.CharField(max_length=255,blank=True,null=True)
    seo_description = models.CharField(max_length=255,blank=True,null=True)
    slug = AutoSlugField(populate_from='title',blank=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Blog,on_delete=models.CASCADE)
    name = models.CharField(max_length=255,blank=True,null=True)
    email = models.CharField(max_length=255,blank=True,null=True)
    text = models.TextField(blank=True,null=True) 
        
    def __str__(self):
        return self.name
    
    
class SideBar(models.Model):
    image = models.ImageField(upload_to="images/sidebar/",blank=True,null=True)
    title = models.CharField(max_length=255,blank=True,null=True)
    description = RichTextField(blank=True,null=True)
    btn_name = models.CharField(max_length=255,blank=True,null=True)
    link = models.CharField(max_length=255,blank=True,null=True)
    video_title = models.CharField(max_length=255,blank=True,null=True)
    video_link = models.CharField(max_length=255,blank=True,null=True)
    
    def __str__(self):
        return self.title


class Contact(models.Model):
    name = models.CharField(max_length=255,blank=True,null=True)
    email = models.CharField(max_length=255,blank=True,null=True)
    text = models.TextField(blank=True,null=True) 
        
    def __str__(self):
        return self.name

