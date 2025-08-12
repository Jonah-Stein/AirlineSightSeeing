from ninja import Schema
from datetime import datetime
from typing import Optional


class CreateManualFlightSchema(Schema):
    flight_number: str
    operating_airline: str
    origin: str
    destination: str
    departure_time: Optional[datetime] = None
    arrival_time: Optional[datetime] = None
