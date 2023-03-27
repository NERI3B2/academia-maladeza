from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet

from .models import Exercicio
from .serializers import ExercicioSerializer
from .filters import ExercicioFilterSet

# Create your views here.
class ExercicioViewSet(ModelViewSet):
    queryset = Exercicio.objects.all()
    serializer_class = ExercicioSerializer
    ordering = ['-id']
    filterset_class = ExercicioFilterSet