from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from rest_framework.authtoken import views


urlpatterns = [path('api/v1/', include(f'{app}.urls')) for app in settings.MEUS_APPS]
urlpatterns += [
    path('api/v1/login/', views.obtain_auth_token)
]
