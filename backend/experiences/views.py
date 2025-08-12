from django.shortcuts import render
from .schema import CreateExperienceSchema
import uuid
from django.db import transaction
from .models import Experience
from photos.models import Photo
from django.forms.models import model_to_dict


def create_experience(user_id: uuid.UUID, data: CreateExperienceSchema):
    experience_data = {
        k: v for k, v in data.dict().items() if v is not None and k != "photo_ids"
    }
    try:
        with transaction.atomic():
            experience = Experience.objects.create(user_id=user_id, **experience_data)

            Photo.objects.filter(id__in=data.photo_ids, user_id=user_id).update(
                experience=experience
            )
            return model_to_dict(experience)
    except Exception as e:
        return {"error": str(e)}


# TODO: Add privacy management
def get_experiences_for_user(user_id: uuid.UUID):
    return Experience.objects.filter(user_id=user_id).all()
