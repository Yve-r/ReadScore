from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/result/', views.api_result, name='api_result'),
]
