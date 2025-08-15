from typing import List
from django.core.files.storage import default_storage
from django.shortcuts import render
from ninja import File
from .schema import CreatePhotoSchema
from .models import Photo
from ninja.files import UploadedFile
import uuid
from common.storage import get_presigned_url

# Create your views here.


def create_photo(photo: CreatePhotoSchema):
    return Photo.objects.create(**photo.dict())


def upload_photos(user_id: uuid.UUID, photos: List[File[UploadedFile]]):
    saved_photo_paths = []
    instances = []
    try:
        for photo in photos:
            saved_photo_paths.append(save_photo_to_storage(user_id, photo))
            # Should add logic to read metadata from photo
            instances.append(Photo(image=saved_photo_paths[-1], user_id=user_id))
        Photo.objects.bulk_create(instances)
    except Exception as e:
        for path in saved_photo_paths:
            default_storage.delete(path)
        return {"status": "error", "error": f"Failed to upload photos, {e}"}
    return {"status": "success"}


# TODO: Convert to standard image type
def save_photo_to_storage(user_id: uuid.UUID, photo: File[UploadedFile]):
    field = Photo._meta.get_field("image")
    file_path = field.upload_to(Photo(user_id=user_id), photo.name)
    return default_storage.save(file_path, photo)


def get_users_photos(user_id: uuid.UUID):
    """Returns the s3 paths for all user's photos.
    Frontend then makes a direct call to the object storage to get the photo.
    """
    try:

        photos = (
            Photo.objects.filter(user_id=user_id)
            .values("id", "image")
            .order_by("-datetime")
        )

        photos_to_return = dict()
        for photo in photos:
            key = photo["image"].lstrip("/")
            photos_to_return[str(photo["id"])] = get_presigned_url(key)
        return photos_to_return
    except Exception as e:
        return {"status": "error", "error": f"Failed to get user's photos, {e}"}
