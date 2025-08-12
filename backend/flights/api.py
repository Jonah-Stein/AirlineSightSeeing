import uuid
from ninja import Router
from . import views
from .schema import CreateManualFlightSchema

flight_router = Router()


@flight_router.post("/manual-create")
def create_manual_flight(request, data: CreateManualFlightSchema):
    return views.create_manual_flight(data)


@flight_router.get("/{flight_id}")
def get_flight(request, flight_id: uuid.UUID):
    return views.get_flight(flight_id)


# TODO: Add flight creation by referencing flightradar api
