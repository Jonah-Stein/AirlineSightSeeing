from ninja import Schema
from typing import Optional
from pydantic import EmailStr


class UserSignupSchema(Schema):
    email: EmailStr
    password: str


class UserLoginSchema(Schema):
    email: EmailStr
    password: str


# TODO: Change to only send access token
class TokensOut(Schema):
    access: str
    refresh: str


# TODO: Can probably remove this
class RefreshTokenSchema(Schema):
    refresh: str


class UpdateUserSchema(Schema):
    email: EmailStr
    first_name: str
    last_name: str


# Profile
class UpdateProfileSchema(Schema):
    profile_name: Optional[str] = None
    bio: Optional[str] = None
