from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import BookingsViewSet, BookingListView, BookingCreateView, BookingDeleteView

app_name = 'bookings'

router = DefaultRouter()
router.register('api', BookingsViewSet)

urlpatterns = [
    path('', BookingListView.as_view(), name='list'),
    path('create/<int:flight_pk>/', BookingCreateView.as_view(), name='create'),
    path('delete/<int:pk>/', BookingDeleteView.as_view(), name='delete'),
] + router.urls
