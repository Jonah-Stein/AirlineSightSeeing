from django.conf import settings
from django.db import models
import uuid
from common.models import TimestampedModel


# Create your models here.
class Flight(TimestampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField()
    flight_number = models.CharField(max_length=10)
    operating_airline = models.CharField()
    origin = models.CharField(max_length=4)
    destination = models.CharField(max_length=4)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="flights", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.flight_number
