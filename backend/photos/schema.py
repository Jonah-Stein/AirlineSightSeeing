from ninja import Schema
from typing import Optional


class CreatePhotoSchema(Schema):
    photo_url: str
    experience_id: Optional[str] = None
    flight_id: Optional[str] = None
