from rest_framework.viewsets import ModelViewSet
from .models import Flight
from .serializers import FlightSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class FlightViewSet(ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["number_of_race", "flight_date",  "flight_time", "from_city", "to_city", "aircraft_id", "bookings_id"]
    search_fields = ["number_of_race", "flight_date",  "flight_time", "from_city", "to_city", "aircraft_id", "bookings_id"]
    ordering_fields = ["number_of_race", "flight_date",  "flight_time", "from_city", "to_city", "aircraft_id", "bookings_id"]