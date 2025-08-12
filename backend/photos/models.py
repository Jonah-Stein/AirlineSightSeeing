from django.conf import settings
from django.db import models
import uuid
from common.models import TimestampedModel
from experiences.models import Experience
from pins.models import Pin


# Create your models here.
class Photo(TimestampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    image = models.ImageField()
    datetime = models.DateTimeField()
    # Need to change this at some point. Coordinates stored as a tuple
    # Have a meta chords and calculated choords
    meta_lat = models.FloatField()
    meta_lon = models.FloatField()
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
    pin = models.ForeignKey(
        Pin, related_name="photos", on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.user}-experience:{self.experience}-{self.datetime}"
