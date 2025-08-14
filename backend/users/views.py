import uuid
import logging
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.db import IntegrityError
from django.db.models.fields.files import default_storage
from ninja import File, UploadedFile
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken
from django.forms.models import model_to_dict
from ninja.errors import HttpError

from .schema import (
    UserLoginSchema,
    UserSignupSchema,
    UpdateProfileSchema,
)
from .models import Profile

logger = logging.getLogger(__name__)
User = get_user_model()


def signup(request, data: UserSignupSchema):
    password = data.password
    user_data_excluding_password = {
        k: v for k, v in data.dict().items() if k != "password"
    }
    try:
        user = User.objects.create_user(
            password=password, **user_data_excluding_password
        )
        return login(request, UserLoginSchema(email=user.email, password=password))
    except IntegrityError:
        return {
            "status": "error",
            "error": "Email already has an associated profile",
        }
    except Exception as e:
        logger.exception(f"Error during signup {e}")
        return {"status": "error", "error": "Error creating profile"}


def login(request, data: UserLoginSchema):
    user = authenticate(email=data.email, password=data.password)
    if user is None:
        raise InvalidToken("Invalid credentials")
    access = AccessToken.for_user(user)

    request.session.flush()
    request.session["user_id"] = str(user.id)
    request.session.set_expiry(settings.SESSION_COOKIE_AGE)
    request.session.save()

    return {"access": str(access)}


def refresh(request):
    try:
        user_id = request.session["user_id"]
        new_access = AccessToken.for_user(User(id=user_id))

        return {"access": str(new_access)}
    except:
        raise HttpError(401, "Invalid/missing refresh token")


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
