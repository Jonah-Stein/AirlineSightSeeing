from django.shortcuts import HttpResponse, render
from .models import User


# Create your views here.
def index(request):
    users = User.objects.all()
    return HttpResponse(f"hello, world, {users}")
