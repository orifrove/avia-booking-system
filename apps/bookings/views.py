from rest_framework.viewsets import ModelViewSet
from .models import Bookings
from .serializers import BookingsSerializer

class BookingsViewSet(ModelViewSet):
    queryset = Bookings.objects.all()
    serializer_class = BookingsSerializer 
    # filter_backends = [DjangoFilterBackend, filters.Searchfilter, filtersOrdering]
    # filterset_fields = ["author", "title"]