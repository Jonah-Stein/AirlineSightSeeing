from ninja import Router
from .schema import CreatePhotoSchema
from . import views
from common.auth import JWTAuth
from typing import List
from ninja.files import UploadedFile
from ninja import File

photo_router = Router(auth=JWTAuth())


@photo_router.post("/create")
def create_photo(request, photo: CreatePhotoSchema):
    return views.create_photo(photo)


@photo_router.post("/upload")
def upload_photo(request, photos: File[List[UploadedFile]]):
    user_id = request.auth
    return views.upload_photos(user_id, photos)


@photo_router.get("/user")
def get_users_photos(request):
    user_id = request.auth
    return views.get_users_photos(user_id)
