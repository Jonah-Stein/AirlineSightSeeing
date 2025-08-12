from ninja import NinjaAPI
from users.api import auth_router, user_router, profile_router
from flights.api import flight_router
from landmarks.api import landmark_router
from photos.api import photo_router
from pins.api import pin_router
from experiences.api import experience_router


api = NinjaAPI()


api.add_router("auth", auth_router)
api.add_router("users", user_router)
api.add_router("profiles", profile_router)
api.add_router("flights", flight_router)
api.add_router("landmarks", landmark_router)
api.add_router("photos", photo_router)
api.add_router("pins", pin_router)
api.add_router("experiences", experience_router)
