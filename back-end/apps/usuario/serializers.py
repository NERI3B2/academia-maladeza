from rest_framework.serializers import ModelSerializer
from .models import Usuario
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password


class UsuarioSerializer(ModelSerializer):
    def validate_password(self, password):
        validate_password(password)

        return make_password(password)

    class Meta:
        model = Usuario
        fields = '__all__'

