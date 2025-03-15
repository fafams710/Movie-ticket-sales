import stripe
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from orders.models import Order

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntent(APIView):
    def post(self, request):
        amount = request.data.get('amount')
        if amount is None:
            return Response({"error": "Amount not provided"}, status=400)
        try:
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='php'
            )
        except Exception as e:
            return Response({"error": str(e)}, status=400)
        return Response({'clientSecret': intent.client_secret})


@method_decorator(csrf_exempt, name='dispatch')
class PaymentWebhookAPI(APIView):
    def post(self, request):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except ValueError:
            # Invalid payload
            return Response(status=400)
        except stripe.error.SignatureVerificationError:
            # Invalid signature
            return Response(status=400)

        if event.get('type') == 'payment_intent.succeeded':
            payment_intent = event['data']['object']
            try:
                order = Order.objects.get(payment_intent_id=payment_intent['id'])
                order.status = 'paid'
                order.save()
            except Order.DoesNotExist:
                return Response({'error': 'Order not found'}, status=404)
        return Response(status=200)
