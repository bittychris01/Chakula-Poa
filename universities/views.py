from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import University
from .serializers import UniversitySerializer

class UniversityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = University.objects.filter(is_active=True)
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]