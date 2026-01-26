from rest_framework import serializers
from .models import Staff, StaffSchedule


class StaffScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffSchedule
        fields = ['id', 'staff', 'day_of_week', 'start_time', 'end_time']


class StaffSerializer(serializers.ModelSerializer):
    schedules = StaffScheduleSerializer(many=True, read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = Staff
        fields = ['id', 'user', 'email', 'role', 'employee_id', 'department', 
                  'is_active', 'hired_date', 'schedules', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']