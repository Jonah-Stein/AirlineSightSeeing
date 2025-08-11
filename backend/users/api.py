from ninja import File, Router
import uuid
from ninja import Form
from ninja.files import UploadedFile
import logging
from common.auth import JWTAuth
from . import views
from .schema import (
    RefreshTokenSchema,
    TokensOut,
    UpdateProfileSchema,
    UserLoginSchema,
    UserSignupSchema,
)

logger = logging.getLogger(__name__)

auth_router = Router()
user_router = Router(auth=JWTAuth())
profile_router = Router()


@auth_router.post("/signup")
def signup(request, data: UserSignupSchema):
    return views.signup(data)


@auth_router.post("/login", response=TokensOut)
def login(request, data: UserLoginSchema):
    return views.login(data)


@auth_router.post("/refresh", response=TokensOut)
def refresh(request, data: RefreshTokenSchema):
    return views.refresh(data)


@user_router.get("/me")
def get_me(request):
    logger.info("get_me")
    logger.info(f"auth: {request.auth}")
    user_id = request.auth
    logger.info(f"user_id: {user_id}")
    return views.get_user(user_id)


@user_router.get("/{user_id}")
def get_user(request, user_id: uuid.UUID):
    return views.get_user(user_id)


# PROFILE FUNCTIONS
@profile_router.get("/{profile_id}")
def get_profile(request, profile_id: str):
    return views.get_profile(profile_id)


# Can call with form data to send the file
@profile_router.patch("/{profile_id}")
def update_profile(
    request,
    profile_id: str,
    data: Form[UpdateProfileSchema],
    picture: File[UploadedFile] = None,
):
    return views.update_profile(profile_id, data, picture)
