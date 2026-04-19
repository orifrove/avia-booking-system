from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .models import Flight
from .serializers import FlightSerializer


class FlightViewSet(ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['number_of_race', 'flight_date', 'flight_time', 'from_city', 'to_city', 'aircraft_id', 'bookings_id']
    search_fields = ['number_of_race', 'flight_date', 'flight_time', 'from_city', 'to_city']
    ordering_fields = ['number_of_race', 'flight_date', 'flight_time', 'from_city', 'to_city']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        elif self.action == 'destroy':
            return [IsAdminUser()]
        return [IsAuthenticated()]