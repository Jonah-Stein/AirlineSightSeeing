from django.db import models
import uuid


# Create your models here.
class Landmark(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    # Once coordinates are updated for the photo, may want to move these into one object
    lat = models.FloatField()
    lon = models.FloatField()
    name = models.CharField()
    description = models.CharField(null=True, blank=True)
    link = models.CharField(null=True, blank=True)

    def __str__(self):
        return self.name
