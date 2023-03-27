import django_filters
from .models import Exercicio


class ExercicioFilterSet(django_filters.FilterSet):
    class Meta:
        model = Exercicio
        fields = {
            'nome_exercicio': ['exact', 'iexact', 'icontains'],
            'serie': ['exact', 'iexact', 'icontains'],
            'descanso': ['exact', 'iexact', 'icontains'],
            'parte_corpo': ['exact', 'iexact', 'icontains'],
            'fixa': ['exact']
        }
