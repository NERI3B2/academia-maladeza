from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import ExercicioViewSet

router = SimpleRouter()
router.register('exercicio', ExercicioViewSet)

urlpatterns = [
    path('', include(router.urls))
]