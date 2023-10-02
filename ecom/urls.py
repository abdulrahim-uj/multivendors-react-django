from django.urls import path
from .views import HomeSliderView,HomeFourView,CategoryView,ProductView,\
    ProductDetailsView,ReactProductDetailsView,ReactProductView, PriceFilterView\
        ,CategoryFilterView,ReactCategoryView,ProductReview,CartView,MyCartView\
            ,BillingView,PaymentView,OrderView,PlaceOrderView,SearchFilterView

from . import views

urlpatterns = [
    # Base URLs
    path('homeslider/', HomeSliderView.as_view(), name='homeslider'),
    path('homefour/', HomeFourView.as_view(), name='homefour'),
    path('category/',CategoryView.as_view(),name="cateogry"),
    
    path('product/',ProductView.as_view(),name="product"),
    path('products/',ReactProductView.as_view(),name="product"),
    
    path('productslug/',ProductDetailsView.as_view(),name="product-details"),
    path('products/<str:slug>',ReactProductDetailsView.as_view(),name="product-details"),
    # category/smart-phone-tables/pc-retina-2016-mlha2-12-inches-goshawk-impact
    # path('')
    
    path('pricefilter/',PriceFilterView.as_view(),name="price-filter"),
    path('categoryfilter/',CategoryFilterView.as_view(),name="category-filter"),
    
    # Redirect Pages
    path('category/<str:slug>',ReactCategoryView.as_view(),name="category"),  
    # path('category/<str:slug>/<str:slug>/',ReactCategoryView.as_view(),name="category"),  
    
    # Product Review
    path('review/',ProductReview.as_view(),name="review"),
    
    
    # Cart Functionality
    path('cart/',CartView.as_view(),name="cart"),
    path('mycart/',MyCartView.as_view(),name="mycart"),
    
    # CheckOut 
    path('checkout/',MyCartView.as_view(),name="checkout"),
    
    # billing 
    path('billing/',BillingView.as_view(),name="billing"),
    
    # payment
    path('payment/',PaymentView.as_view(),name="payment"),
    
    # Order 
    path('orders', OrderView.as_view(),name="orders"),
    path('placeorder', PlaceOrderView.as_view(),name="placeorder"),
    
    # Search
    path('search/',SearchFilterView.as_view(),name="search-filter"),
    
    # Preview 
    path('preview/',views.preview,name="preview"),
    
    
    
] 
