from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import FixaViewSet

router = SimpleRouter()
router.register('fixa', FixaViewSet)

urlpatterns = [
    path('', include(router.urls))
]