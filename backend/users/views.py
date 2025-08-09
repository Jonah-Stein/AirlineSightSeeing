from django.shortcuts import render
from .models import User


# Create your views here.
def find_one(id: str):
    return "findOne"


def find_all():
    return "findAll"
