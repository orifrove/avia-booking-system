from django.urls import path
from .views import FlightListAPIView

urlpatterns = [
    path('list/', FlightListAPIView.as_view(), name='flight-list'),
]
