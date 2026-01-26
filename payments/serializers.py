from rest_framework import serializers
from .models import Payment, PaymentCallback


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'user', 'amount', 'status', 'payment_method', 
                  'transaction_id', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'status', 'transaction_id', 'created_at', 'updated_at']


class PaymentCallbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentCallback
        fields = ['id', 'payment', 'raw_response', 'created_at']