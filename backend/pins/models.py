from django.db import models
from common.models import TimestampedModel
import uuid


# Create your models here.
class Pin(TimestampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    lat = models.FloatField()
    lon = models.FloatField()
    name = models.CharField()
    description = models.CharField(null=True, blank=True)

    def __str__(self):
        return self.name
