# orders/views.py
import qrcode
from io import BytesIO
from django.core.files import File
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Order
from .serializers import OrderSerializer


class CreateOrderAPI(APIView):
    @transaction.atomic
    def post(self, request):
        # Extract data from request
        ticket_type_id = request.data.get('ticket_type')
        quantity = request.data.get('quantity')

        # Check if both ticket_type and quantity are provided
        if not ticket_type_id or not quantity:
            return Response({"error": "ticket_type and quantity are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            ticket_type = TicketType.objects.get(id=ticket_type_id)
        except TicketType.DoesNotExist:
            return Response({"error": "Ticket type not found"}, status=status.HTTP_404_NOT_FOUND)

        total_price = ticket_type.price * quantity

        # Create the order
        order = Order.objects.create(
            user=request.user,
            ticket_type=ticket_type,
            quantity=quantity,
            total_price=total_price,
            payment_intent_id=request.data.get('payment_intent_id'),
        )

        # Generate QR code for the order
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(f"ORDER:{order.id}:{request.user.email}")
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")

        # Save QR code to the model
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)
        order.qr_code.save(f'qrcode_{order.id}.png', File(buffer))

        # Return the order details
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderHistoryAPI(APIView):
    def get(self, request):
        # Retrieve orders for the authenticated user
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
