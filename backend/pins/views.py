from django.shortcuts import render
from .models import Pin

# Create your views here.


def get_user_pins(user_id):
    pins = Pin.objects.filter(user_id=user_id)
    print(pins)
    return pins
