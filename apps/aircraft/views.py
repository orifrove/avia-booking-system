from rest_framework.viewsets import ModelViewSet
from .models import Aircraft
from .serializers import AircraftSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class AircraftViewSet(ModelViewSet):
    queryset = Aircraft.objects.all()
    serializer_class = AircraftSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["models"]
    search_fields = ["models"]
    ordering_fields = ["models"]
