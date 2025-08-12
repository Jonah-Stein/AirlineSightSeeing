import uuid
import logging
from django.contrib.auth import authenticate, get_user_model
from django.db import IntegrityError
from django.db.models.fields.files import default_storage
from ninja import File, UploadedFile
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.forms.models import model_to_dict

from .schema import (
    RefreshTokenSchema,
    UserLoginSchema,
    UserSignupSchema,
    UpdateProfileSchema,
)
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

    # TODO: return access and refresh tokens instead of just id
    return {"status": "success", "id": str(user.id)}


## DO THIS NEXT -- need to work out authentication across endpoints
def login(data: UserLoginSchema):
    user = authenticate(email=data.email, password=data.password)
    if user is None:
        raise InvalidToken("Invalid credentials")
    access = AccessToken.for_user(user)
    refresh = RefreshToken.for_user(user)
    return {"access": str(access), "refresh": str(refresh)}


def refresh(data: RefreshTokenSchema):
    try:
        r = RefreshToken(data.refresh)
        user = r.user

        r.blacklist()

        new_access = AccessToken.for_user(user)
        new_refresh = RefreshToken.for_user(user)
        return {"access": str(new_access), "refresh": str(new_refresh)}
    except TokenError as e:
        raise InvalidToken(e.args[0])


def get_user(user_id: uuid.UUID):
    try:
        user = User.objects.get(id=user_id)
        user_dict = model_to_dict(user)
        # Convert UUID to string
        user_dict["id"] = str(user.id)
        return user_dict
    except User.DoesNotExist:
        return {"error": "User not found"}


# Profile views
def get_profile(profile_id: uuid.UUID):
    return Profile.objects.get(id=profile_id)


def update_profile(
    profile_id: uuid.UUID, data: UpdateProfileSchema, picture: File[UploadedFile] = None
):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    if picture:
        file_path = save_profile_picture_to_storage(profile_id, picture)
        update_data["picture"] = file_path
    Profile.objects.filter(id=profile_id).update(**update_data)
    return {"status": "success"}


# TODO: Check if i can validate the file to be an image
# TODO: set up image upload pipeline to standardize image format
def save_profile_picture_to_storage(profile_id: uuid.UUID, picture: File[UploadedFile]):
    field = Profile._meta.get_field("picture")
    file_path = field.upload_to(Profile(id=profile_id), picture.name)
    # Once image conversions are implemented, this will overwrite the existing profile picture
    return default_storage.save(file_path, picture)
