from rest_framework.viewsets import ModelViewSet
from .models import Bookings
from .serializers import BookingsSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class BookingsViewSet(ModelViewSet):
    queryset = Bookings.objects.all()
    serializer_class = BookingsSerializer 
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["flights_id", "username",  "passport", "phone", "ayments_id"]
    search_fields = ["flights_id", "username",  "passport", "phone", "ayments_id"]
    ordering_fields = ["flights_id", "username",  "passport", "phone", "ayments_id"]

    