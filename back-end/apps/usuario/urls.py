from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import UsuarioViewSet

router = SimpleRouter()
router.register('usuarios', UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls))
]
