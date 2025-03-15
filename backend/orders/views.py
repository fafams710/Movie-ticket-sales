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
        serializer = OrderSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # Calculate total price
            ticket_type = serializer.validated_data['ticket_type']
            quantity = serializer.validated_data['quantity']
            total_price = ticket_type.price * quantity
            
            # Create order
            order = serializer.save(
                user=request.user,
                total_price=total_price,
                payment_intent_id=request.data.get('payment_intent_id')
            )
            
            # Generate QR code
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )
            qr.add_data(f"ORDER:{order.id}:{request.user.email}")
            qr.make(fit=True)
            img = qr.make_image(fill_color="black", back_color="white")
            
            # Save QR code to model
            buffer = BytesIO()
            img.save(buffer, format="PNG")
            buffer.seek(0)
            order.qr_code.save(f'qrcode_{order.id}.png', File(buffer))
            
            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderHistoryAPI(APIView):
    def get(self, request):
        # Retrieve orders for the authenticated user
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
