from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Payment, PaymentCallback
from .serializers import PaymentSerializer, PaymentCallbackSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def initiate(self, request, pk=None):
        payment = self.get_object()
        # Add your payment gateway integration logic here
        return Response({'status': 'Payment initiated'}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'])
    def callback(self, request):
        # Handle payment callback from gateway
        return Response({'status': 'Callback received'}, status=status.HTTP_200_OK)