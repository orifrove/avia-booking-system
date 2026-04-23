from django.shortcuts import render
from apps.flights.models import Flight
from apps.bookings.models import Bookings
from apps.aircraft.models import Aircraft

def home(request):
    return render(request, 'home.html', {
        'flights_count': Flight.objects.count(),
        'bookings_count': Bookings.objects.count(),
        'aircraft_count': Aircraft.objects.count(),
    })
