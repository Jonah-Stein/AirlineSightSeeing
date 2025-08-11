from ninja import Schema
from typing import Optional
from pydantic import EmailStr


class UserSignupSchema(Schema):
    email: EmailStr
    password: str


class UserLoginSchema(Schema):
    email: EmailStr
    password: str


class UpdateUserSchema(Schema):
    email: EmailStr
    first_name: str
    last_name: str


# Profile
class UpdateProfileSchema(Schema):
    profile_name: Optional[str] = None
    bio: Optional[str] = None
