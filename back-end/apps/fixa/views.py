from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet

from .models import Fixa
from .serializers import FixaSerializer
from .filters import FixaFilterSet

# Create your views here.
class FixaViewSet(ModelViewSet):
    queryset = Fixa.objects.all()
    serializer_class = FixaSerializer
    ordering = ['-id']
    filterset_class = FixaFilterSet 