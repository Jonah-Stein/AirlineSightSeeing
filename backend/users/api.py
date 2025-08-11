from ninja import File, Router
import uuid
from ninja import Form
from ninja.files import UploadedFile
from . import views
from .schema import UpdateProfileSchema, UserSignupSchema

user_router = Router()
profile_router = Router()


@user_router.post("/signup")
def signup(request, data: UserSignupSchema):
    return views.signup(data)


@user_router.get("/{user_id}")
def find_one(request, user_id: uuid.UUID):
    return views.find_one(user_id)


@user_router.get("/")
def find_all(request):
    return views.find_all()


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
