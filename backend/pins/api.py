from ninja import Router

from . import views
from common.auth import JWTAuth

pin_router = Router(auth=JWTAuth())


@pin_router.get("")
def get_my_pins(request):
    user_id = request.user.id
    return views.get_user_pins(user_id)
