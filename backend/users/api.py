from ninja import Router
import uuid
from . import views

user_router = Router()


@user_router.get("/{user_id}")
def find_one(request, user_id: uuid.UUID):
    return views.find_one(user_id)


@user_router.get("/")
def find_all(request):
    return views.find_all()
