from django.urls import path
from .views import ConcertListView

urlpatterns = [
    path('', ConcertListView.as_view(), name='concert-list'),
]
