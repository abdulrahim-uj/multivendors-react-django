from django.shortcuts import (
    redirect,
    render
)

# HTTP Error 400


def bad_request(request,*args, **argv):
    return redirect('/')

def handler404(request,*args, **argv):
    return redirect('/')

def handler500(request, *args, **argv):
    return redirect('/')