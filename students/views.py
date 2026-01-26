from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Student, StudentVerification
from .serializers import StudentSerializer, StudentVerificationSerializer


class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return Student.objects.all()
        return Student.objects.filter(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        """Submit verification documents"""
        student = self.get_object()
        document_type = request.data.get('document_type')
        document_url = request.data.get('document_url')
        
        if not document_type or not document_url:
            return Response({'error': 'document_type and document_url required'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        verification = StudentVerification.objects.create(
            student=student,
            document_type=document_type,
            document_url=document_url
        )
        return Response(StudentVerificationSerializer(verification).data, 
                       status=status.HTTP_201_CREATED)


class StudentVerificationViewSet(viewsets.ModelViewSet):
    queryset = StudentVerification.objects.all()
    serializer_class = StudentVerificationSerializer
    permission_classes = [IsAuthenticated]