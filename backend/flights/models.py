from django.conf import settings
from django.db import models
import uuid
from common.models import TimestampedModel


# TODO: Make flights "public"
# Right now, flights essentially act like posts for each user:
# Users create flights and only they can add photos, details, etc.
# Each of these flights are also associated with a single user.
# Eventually users should be able to create flights, but they
# shouldn't be associated with a single user. Instead, multiple
# users should be able to add their photos, thoughts, and whatever
# else to the flight.
# This could get difficult with privacy management (flight will have
# to show up under user's profile, but their content shouldn't show
# up for other users viewing the flight).
# To do this, we need to create a new "experience" model which
# will be associated with a flight and a user.


# All of this flight data should be able to be seeded by flightaware
class Flight(TimestampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField()
    flight_number = models.CharField(max_length=10)
    operating_airline = models.CharField()
    origin = models.CharField(max_length=4)
    destination = models.CharField(max_length=4)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()

    def __str__(self):
        return self.flight_number
