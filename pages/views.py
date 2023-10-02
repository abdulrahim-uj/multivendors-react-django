from django.shortcuts import render
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from requests import post
from .models import Blog, SideBar, Team,Comment,Contact,WebsiteInfo
from rest_framework import viewsets
from .serializers import TeamSerializer,BlogSerializer,SideBarSerializer
from django.views import View
from django.utils.decorators import method_decorator


# create a viewset
class TeamViewSet(viewsets.ModelViewSet):
	queryset = Team.objects.all()
	serializer_class = TeamSerializer

class BlogViewSet(viewsets.ModelViewSet):
	queryset = Blog.objects.all().order_by('-id')
	serializer_class = BlogSerializer
 
class SideBarViewSet(viewsets.ModelViewSet):
	queryset = SideBar.objects.all().order_by('id')
	serializer_class = SideBarSerializer


def index(request):    
    return render(request, 'baseecom.html')

def about(request):
    return render(request,'baseecom.html')

def signup(request):
    return render(request,'baseecom.html')

def login(request):
    return render(request,'baseecom.html')

def dashboard(request):
    return render(request,'baseecom.html')

def changepassword(request):
    return render(request,"baseecom.html")

def forgotpassword(request):
    return render(request,'baseecom.html')

def UserPasswordReset(request,uid,token):
    return render(request,"baseecom.html")
    
    
    
@csrf_exempt
def contact(request):
    if request.method == "POST":
        post_data = json.loads(request.body.decode("utf-8"))
        contact = Contact(name=post_data['name'],email=post_data['email'],text=post_data['message'])
        contact.save()
        return JsonResponse({'status':'Success'})
    return render(request,"baseecom.html")



class BlogView(View):
    def get(self,request,*args, **kwargs):
        return render(request,'baseecom.html')

class BlogDetailsView(View):
    def get(self,request,slug,*args, **kwargs):
        postdata = Blog.objects.filter(slug=slug).first()
        if postdata:
            dic = {
            'id':postdata.id,
            'title':postdata.title,
            'category':postdata.category.name,
            'description':postdata.description,
            'image': "http://127.0.0.1:8000/" + str(postdata.image.url),
            'created_date': str(postdata.created_date.utcnow())[:16],
            'slug':postdata.slug
            }  
            return JsonResponse(status=200, data={'status':'true','postdata':json.dumps(dic)})
        else:
            return JsonResponse(status=500,data={'message':'This URL Post is Not Available'})

def posts(request,slug):
    return render(request,'baseecom.html')


@method_decorator(csrf_exempt, name='dispatch')
class CommentDetailsView(View):
    def get(self,request,*args, **kwargs):
        blog = Blog.objects.get(id=request.GET.get('id',''))
        comment = Comment.objects.filter(post=blog).order_by('id')
        comment = comment.values()
        return JsonResponse(status=200,data={'message':"Successfully Submit Your Comment",'data':list(comment)})

    def post(self,request,*args, **kwargs):
        post_data = json.loads(request.body.decode("utf-8"))
        blog = Blog.objects.get(id=post_data['id'])
        comment = Comment(post=blog,name=post_data['name'],email=post_data['email'],text=post_data['content'])
        comment.save()
        
        comment = Comment.objects.filter(post=blog).order_by('id')
        comment = comment.values()
        
        return JsonResponse(status=200,data={'message':"Successfully Submit Your Comment",'data':list(comment)})

class WebsiteView(View):
    def get(self,request,*args, **kwargs):
        info = list(WebsiteInfo.objects.values())
        return JsonResponse({'status':'Success','data':info})
        
