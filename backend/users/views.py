import uuid
import logging
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.db.models.fields.files import default_storage
from django.shortcuts import render
from ninja import File, UploadedFile

from .schema import UserSignupSchema, UpdateProfileSchema
from .models import Profile

logger = logging.getLogger(__name__)
User = get_user_model()


def signup(data: UserSignupSchema):
    password = data.password
    user_data_excluding_password = {
        k: v for k, v in data.dict().items() if k != "password"
    }
    try:
        user = User.objects.create_user(
            password=password, **user_data_excluding_password
        )
    except IntegrityError:
        return {
            "status": "error",
            "error": "Email already has an associated profile",
        }
    except Exception as e:
        logger.exception(f"Error during signup {e}")
        return {"status": "error", "error": "Error creating profile"}
    return {"status": "success", "id": str(user.id)}


# Create your views here.
def find_one(id: str):
    return "findOne"


def find_all():
    return "findAll"


# Profile views
def get_profile(profile_id: uuid.UUID):
    return Profile.objects.get(id=profile_id)


def update_profile(
    profile_id: uuid.UUID, data: UpdateProfileSchema, picture: File[UploadedFile] = None
):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    if picture:
        file_path = save_profile_picture(profile_id, picture)
        update_data["picture"] = file_path
    Profile.objects.filter(id=profile_id).update(**update_data)
    return {"status": "success"}


# TODO: Check if i can validate the file to be an image
# TODO: set up image upload pipeline to standardize image format
def save_profile_picture(profile_id: uuid.UUID, picture: File[UploadedFile]):
    field = Profile._meta.get_field("picture")
    file_path = field.upload_to(Profile(id=profile_id), picture.name)
    # Once image conversions are implemented, this will overwrite the existing profile picture
    return default_storage.save(file_path, picture)
