from rest_framework import serializers
from .models import Transactions

class TransactionsSerializer(serializers.ModelSerializers):
    class Meta:
        model = Transactions
        fields = ['id', 'user_id', 'amount', 'transa']