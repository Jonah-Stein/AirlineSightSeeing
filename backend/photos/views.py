from typing import List
from django.core.files.storage import default_storage
from django.forms import model_to_dict
from django.shortcuts import render
from ninja import File
from .schema import CreatePhotoSchema, UpdatePhotoSchema
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

        photos_to_return = []
        for photo in photos:
            image_key = photo["image"].lstrip("/")
            photos_to_return.append(
                {"id": str(photo["id"]), "imageUrl": get_presigned_url(image_key)}
            )
        return photos_to_return
    except Exception as e:
        return {"status": "error", "error": f"Failed to get user's photos, {e}"}


def update_photo(photo_id: uuid.UUID, update_photo: UpdatePhotoSchema):
    update_photo_dict = {k: v for k, v in update_photo.dict().items() if v is not None}
    photo = Photo.objects.filter(id=photo_id).update(**update_photo_dict)
    return photo


def get_photo(photo_id: uuid.UUID):
    photo = Photo.objects.select_related("experience", "pin").get(id=photo_id)
    photo_dict = model_to_dict(photo)
    photo_dict["imageUrl"] = get_presigned_url(photo_dict["image"].name)
    photo_dict.pop("image")
    # return photo_dict
    # TODO: fetch flight and pin data as well
    return {
        **photo_dict,
        "experience": model_to_dict(photo.experience) if photo.experience else None,
        "pin": model_to_dict(photo.pin) if photo.pin else None,
    }
