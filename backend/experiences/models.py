from django.db import models
from django.conf import settings
from common.models import TimestampedModel
from flights.models import Flight
import uuid


class Experience(TimestampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField()
    description = models.TextField(null=True, blank=True)
    flight = models.ForeignKey(
        Flight, related_name="experiences", on_delete=models.PROTECT
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="experiences", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.user}-name:{self.name}"
