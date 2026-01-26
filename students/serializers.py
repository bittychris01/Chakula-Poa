from rest_framework import serializers
from .models import Student, StudentVerification


class StudentVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentVerification
        fields = ['id', 'student', 'document_type', 'document_url', 
                  'is_approved', 'reviewed_at', 'created_at']
        read_only_fields = ['id', 'is_approved', 'reviewed_at', 'created_at']


class StudentSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    university_name = serializers.CharField(source='university.name', read_only=True)
    
    class Meta:
        model = Student
        fields = ['id', 'user', 'email', 'student_id', 'university', 'university_name',
                  'course', 'year_of_study', 'room_number', 'is_verified', 
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'is_verified', 'created_at', 'updated_at']