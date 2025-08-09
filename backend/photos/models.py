from django.db import models
import uuid
from users.models import User
from flights.models import Flight
from pins.models import Pin


# Create your models here.
class Photo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    image = models.ImageField()
    datetime = models.DateTimeField()
    # Need to change this at some point. Coordinates stored as a tuple
    # Have a meta chords and calculated choords
    meta_lat = models.FloatField()
    meta_lon = models.FloatField()
    user = models.ForeignKey(
        User, related_name="photos", on_delete=models.CASCADE, null=True, blank=True
    )
    flight = models.ForeignKey(
        Flight, related_name="photos", on_delete=models.SET_NULL, null=True, blank=True
    )
    pin = models.ForeignKey(
        Pin, related_name="photos", on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.user}-flight:{self.flight}-{self.datetime}"
