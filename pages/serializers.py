from .models import Team,Blog,SideBar,Comment
from rest_framework import serializers

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

class SideBarSerializer(serializers.ModelSerializer):
    class Meta:
        model = SideBar
        fields = '__all__'
