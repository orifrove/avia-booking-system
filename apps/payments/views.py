from rest_framework.viewsets import ModelViewSet
from .models import Payments
from .serializers import PaymentsSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class PaymentsViewSet(ModelViewSet):
    queryset = Payments.objects.all()
    serializer_class = PaymentsSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["type_fly", "price"]
    search_fields = ["type_fly", "price"]
    ordering_fields = ["type_fly", "price"]
