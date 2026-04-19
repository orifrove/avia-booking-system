from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .models import Bookings
from .serializers import BookingsSerializer


class BookingsViewSet(ModelViewSet):
    queryset = Bookings.objects.all()
    serializer_class = BookingsSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['username', 'passport', 'phone', 'flights_id', 'payments_id']
    search_fields = ['username', 'passport', 'phone']
    ordering_fields = ['username', 'flights_id']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticated()]
        elif self.action == 'destroy':
            return [IsAdminUser()]
        return [IsAuthenticated()]