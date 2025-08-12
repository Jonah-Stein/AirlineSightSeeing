from .models import Flight
from .schema import CreateManualFlightSchema
from django.utils import timezone

# Create your views here.


def create_manual_flight(data: CreateManualFlightSchema):
    mock_time = str(timezone.now())

    flight_data = {k: v for k, v in data.dict().items() if v is not None}

    flight = Flight.objects.create(
        **flight_data, departure_time=mock_time, arrival_time=mock_time
    )
    return flight.id
