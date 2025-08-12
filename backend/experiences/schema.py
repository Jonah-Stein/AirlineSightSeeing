from ninja import Schema
import uuid
from typing import List


class CreateExperienceSchema(Schema):
    name: str
    description: str
    photo_ids: List[str]
    flight_id: uuid.UUID
