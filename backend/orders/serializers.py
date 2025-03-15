from rest_framework import serializers
from .models import Order
from tickets.models import TicketType  # if needed for any nested serialization

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id',
            'ticket_type',
            'quantity',
            'total_price',
            'status',
            'payment_intent_id',
            'qr_code',
            'created_at'
        ]
        read_only_fields = ['total_price', 'status', 'created_at']
