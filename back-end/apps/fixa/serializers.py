from rest_framework.serializers import ModelSerializer
from .models import Fixa


class FixaSerializer(ModelSerializer):
    class Meta:
        model = Fixa
        fields = '__all__'
