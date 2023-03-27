import django_filters
from .models import Fixa


class FixaFilterSet(django_filters.FilterSet):
    class Meta:
        model = Fixa
        fields = {
            'dia': ['icontains', 'exact'],
            'nome': ['icontains', 'exact'],
            'obs': ['icontains', 'exact']
        }