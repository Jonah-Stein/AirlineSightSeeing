from django.db import models
import uuid


# Create your models here.
class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    email = models.CharField()
    first_name = models.CharField()
    last_name = models.CharField()
    # Just stores the path to the image. Image is actually stored
    # In an object storage place like s3. Use boto3 to access securely
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
