from django.urls import path
from .views import FlightListAPIView, FlightListView, FlightDetailView

app_name = 'flights'

urlpatterns = [
    path('', FlightListView.as_view(), name='list'),
    path('<int:pk>/', FlightDetailView.as_view(), name='detail'),
    path('list/', FlightListAPIView.as_view(), name='flight-list'),
]
