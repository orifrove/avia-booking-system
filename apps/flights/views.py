from rest_framework.generics import ListAPIView
from django.views.generic import ListView, DetailView
from django.shortcuts import render
from .models import Flight
from .serializers import FlightSerializer
from apps.payments.views import StandardResultsSetPagination

class FlightListAPIView(ListAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    pagination_class = StandardResultsSetPagination

class FlightListView(ListView):
    model = Flight
    template_name = 'flights/list.html'
    context_object_name = 'flights'
    paginate_by = 6

    def get_queryset(self):
        qs = Flight.objects.all()
        from_city = self.request.GET.get('from_city')
        to_city = self.request.GET.get('to_city')
        flight_date = self.request.GET.get('flight_date')
        if from_city:
            qs = qs.filter(from_city__icontains=from_city)
        if to_city:
            qs = qs.filter(to_city__icontains=to_city)
        if flight_date:
            qs = qs.filter(flight_date=flight_date)
        return qs

class FlightDetailView(DetailView):
    model = Flight
    template_name = 'flights/detail.html'
    context_object_name = 'flight'
