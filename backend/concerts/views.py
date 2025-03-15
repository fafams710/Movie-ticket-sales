from rest_framework.generics import ListAPIView
from .models import Concert
from .serializers import ConcertSerializer

class ConcertListView(ListAPIView):
    queryset = Concert.objects.all()
    serializer_class = ConcertSerializer
