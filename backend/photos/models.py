from django.conf import settings
from django.db import models
import uuid
from common.models import TimestampedModel
from experiences.models import Experience
from pins.models import Pin


# Create your models here.
def photo_upload_name(instance, filename):
    # Can change this name to be more descriptive
    extension = filename.split(".")[-1]
    return f"photos/{instance.user.id}/{instance.id}.{extension}"


class Photo(TimestampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    image = models.ImageField(upload_to=photo_upload_name)
    # Need to change this at some point. Coordinates stored as a tuple
    # Have a meta chords and calculated choords
    name = models.CharField(null=True, blank=True)
    lat = models.FloatField(null=True, blank=True)
    lon = models.FloatField(null=True, blank=True)
    datetime = models.DateTimeField(null=True, blank=True)
    meta_lat = models.FloatField(null=True, blank=True)
    meta_lon = models.FloatField(null=True, blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="photos",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    experience = models.ForeignKey(
        Experience,
        related_name="photos",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    # TODO: enable multiple pins per photo
    pin = models.ForeignKey(
        Pin, related_name="photos", on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.user}-experience:{self.experience}-{self.datetime}"
