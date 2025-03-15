from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
from django.utils import timezone  # Import timezone for current time
from tickets.models import TicketType
import uuid
from datetime import timedelta

class ReserveTicketsAPI(APIView):
    @transaction.atomic
    def post(self, request):
        ticket_type_id = request.data.get('ticket_type')
        quantity = request.data.get('quantity')
        
        # Validate input
        if not ticket_type_id or quantity is None:
            return Response({"error": "Ticket type and quantity are required"}, status=400)
        
        try:
            quantity = int(quantity)
        except ValueError:
            return Response({"error": "Quantity must be a valid number"}, status=400)
        
        try:
            ticket_type = TicketType.objects.select_for_update().get(id=ticket_type_id)
            
            if ticket_type.remaining_quantity < quantity:
                return Response({"error": "Not enough tickets available"}, status=400)
            
            # Deduct the requested quantity from remaining tickets
            ticket_type.remaining_quantity -= quantity
            ticket_type.save()
            
            # Create a reservation with an expiration time 15 minutes from now
            reservation = {
                'reservation_id': str(uuid.uuid4()),
                'expires_at': (timezone.now() + timedelta(minutes=15)).isoformat(),
                'ticket_type': ticket_type.id,
                'quantity': quantity
            }
            
            return Response(reservation)
            
        except TicketType.DoesNotExist:
            return Response({"error": "Invalid ticket type"}, status=400)

class TicketAvailabilityAPI(APIView):
    def get(self, request):
        # Replace this with your actual logic to check ticket availability
        data = {"available": True}
        return Response(data)      