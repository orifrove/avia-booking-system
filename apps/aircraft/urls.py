from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import AircraftViewSet, AircraftListView

app_name = 'aircraft'

router = DefaultRouter()
router.register('api', AircraftViewSet)

urlpatterns = [
    path('', AircraftListView.as_view(), name='list'),
] + router.urls
