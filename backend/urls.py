from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import (
handler400, handler403, handler404, handler500
)
from backend import views
from django.views.static import serve 
from django.conf.urls import url


admin.site.site_title = "iCom Store"
admin.site.index_title = "iCom Store"
admin.site.site_header = "iCom Store"

urlpatterns = [
    path('masterprograming/', admin.site.urls),
    path('auth/', include('account.urls')),
    path('ecom/', include('ecom.urls')),
    path('', include('pages.urls')),
    url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
]

handler404 = 'account.views.error_404_view'
handler404 = 'ecom.views.error_404_view'


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
