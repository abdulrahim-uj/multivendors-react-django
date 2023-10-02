from django.urls import path,include
from rest_framework import routers

from . import views
from pages.views import *

# API Router URL
router = routers.DefaultRouter()
router.register(r'team', TeamViewSet),
router.register(r'blog', BlogViewSet),
router.register(r'sidebar', SideBarViewSet),

urlpatterns = [
    # Base URLs
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),
    path('signup', views.signup, name='signup'),
    path('login', views.login, name='login'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('changepassword', views.changepassword, name='changepassword'),
    path('forgot-password', views.forgotpassword, name='login'),
    path('reset-password/<uid>/<token>/',views.UserPasswordReset, name='reset-password'),

    # Blog URLs for sending data to react
    path('blog',BlogView.as_view(), name='blog'),
    path('blog/<str:slug>',BlogDetailsView.as_view(), name='blog'),
    
    # Blog URLs for react
    path('blogs',BlogView.as_view(), name='blog'),
    path('blogs/<str:slug>',views.posts, name='blog'),
    
    # Comments API
    path('comment',CommentDetailsView.as_view(),name="comment"),
    
    #Website Info
    path('webinfo',WebsiteView.as_view(),name="website-info"),
    
    # API Router URL
    path('api', include(router.urls)),
    

] 
