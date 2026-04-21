from rest_framework.generics import ListAPIView
from .models import Flight
from .serializers import FlightSerializer
from apps.payments.views import StandardResultsSetPagination

class FlightListAPIView(ListAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    pagination_class = StandardResultsSetPagination
