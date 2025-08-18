import uuid
from ninja import Router
from .schema import CreatePhotoSchema, UpdatePhotoSchema
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


@photo_router.get("")
def get_users_photos(request):
    user_id = request.auth
    return views.get_users_photos(user_id)


# TODO: add auth
@photo_router.get("/{photo_id}")
def get_photo(request, photo_id: uuid.UUID):
    print(f"getting photo {photo_id}")
    return views.get_photo(photo_id)


@photo_router.patch("/{photo_id}")
def update_photo(request, photo_id: uuid.UUID, photo: UpdatePhotoSchema):
    return views.update_photo(photo_id, photo)
