from ninja import Schema
from typing import Optional


class CreatePhotoSchema(Schema):
    photo_url: str
    experience_id: Optional[str] = None


class UpdatePhotoSchema(Schema):
    experience_id: Optional[str] = None
    pin_id: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
