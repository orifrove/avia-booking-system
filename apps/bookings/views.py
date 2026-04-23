from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination
from django.views import View
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import Bookings
from .serializers import BookingsSerializer
from apps.flights.models import Flight

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

class CustomPagination(PageNumberPagination):
    page_query_param = 'p'

class BookingsViewSet(ModelViewSet):
    queryset = Bookings.objects.all()
    pagination_class = LargeResultsSetPagination
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

class BookingListView(View):
    def get(self, request):
        bookings = Bookings.objects.all()
        return render(request, 'bookings/list.html', {'bookings': bookings})

class BookingCreateView(View):
    def get(self, request, flight_pk):
        flight = get_object_or_404(Flight, pk=flight_pk)
        return render(request, 'bookings/create.html', {'flight': flight})

    def post(self, request, flight_pk):
        flight = get_object_or_404(Flight, pk=flight_pk)
        Bookings.objects.create(
            flights_id=flight.pk,
            username=request.POST.get('username'),
            passport=request.POST.get('passport'),
            phone=request.POST.get('phone'),
        )
        messages.success(request, 'Бронирование успешно создано!')
        return redirect('bookings:list')

class BookingDeleteView(View):
    def post(self, request, pk):
        booking = get_object_or_404(Bookings, pk=pk)
        booking.delete()
        messages.success(request, 'Бронирование отменено.')
        return redirect('bookings:list')
