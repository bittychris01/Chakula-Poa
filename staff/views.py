from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Staff, StaffSchedule
from .serializers import StaffSerializer, StaffScheduleSerializer


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get_queryset(self):
        queryset = Staff.objects.select_related('user').prefetch_related('schedules')
        role = self.request.query_params.get('role')
        if role:
            queryset = queryset.filter(role=role)
        return queryset


class StaffScheduleViewSet(viewsets.ModelViewSet):
    queryset = StaffSchedule.objects.all()
    serializer_class = StaffScheduleSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]