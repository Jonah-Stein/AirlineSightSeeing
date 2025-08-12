import uuid
from ninja import Router
from common.auth import JWTAuth
from . import views
from .schema import CreateExperienceSchema

experience_router = Router(auth=JWTAuth())


@experience_router.post("/")
def create_experience(request, experience: CreateExperienceSchema):
    user_id = request.auth
    return views.create_experience(user_id, experience)


@experience_router.get("/for-user")
def get_experiences_for_current_user(request):
    user_id = request.auth
    return views.get_experiences_for_user(user_id)


@experience_router.get("/for-user/{user_id}")
def get_experiences_for_user(request, user_id: uuid.UUID):
    return views.get_experiences_for_user(user_id)
