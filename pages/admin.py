from django.contrib import admin
from .models import Team,Category,Blog,SideBar,Comment,Contact,WebsiteInfo

# Register your models here.

admin.site.register(WebsiteInfo)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'designation')
    ordering = ('name',)
    search_fields = ('name', 'designation')
    

admin.site.register(Category)
admin.site.register(SideBar)
admin.site.register(Comment)
admin.site.register(Contact)
    
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title','created_date','category')
    ordering = ('title','created_date','category')
    search_fields = ('title','created_date','category')