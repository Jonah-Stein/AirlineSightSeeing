from django.db import models


# Create your models here.
class flight(models.Model):
    flight_number = models.CharField(max_length=10)
    operating_airline = models.CharField()
