from django.db import models


# Create your models here.
class User(models.Model):
    id = models.UUIDField(primary_key=True)
    email = models.CharField()
    first_name = models.CharField()
    last_name = models.CharField()
    # Just stores the path to the image. Image is actually stored
    # In an object storage place like s3. Use boto3 to access securely
    image = models.ImageField()


class Flight(models.Model):
    id = models.UUIDField(primary_key=True)
    name = models.CharField()
    flight_number = models.CharField(max_length=10)
    operating_airline = models.CharField()
    origin = models.CharField(max_length=4)
    destination = models.CharField(max_length=4)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    user = models.ForeignKey(User, related_name="flights", on_delete=models.CASCADE)


class Pin(models.Model):
    id = models.UUIDField(primary_key=True)
    lat = models.FloatField()
    lon = models.FloatField()
    name = models.CharField()


class Photo(models.Model):
    id = models.UUIDField(primary_key=True)
    image = models.ImageField()
    datetime = models.DateTimeField()
    meta_lat = models.FloatField()
    meta_lon = models.FloatField()
    user = models.ForeignKey(
        User, related_name="photos", on_delete=models.CASCADE, null=True, blank=True
    )
    flight = models.ForeignKey(
        Flight, related_name="photos", on_delete=models.SET_NULL, null=True, blank=True
    )
    pin = models.ForeignKey(
        Pin, related_name="photos", on_delete=models.SET_NULL, null=True
    )


class Landmark(models.Model):
    id = models.UUIDField(primary_key=True)
    lat = models.FloatField()
    lon = models.FloatField()
    name = models.CharField()
    description = models.CharField()
    link = models.CharField()
