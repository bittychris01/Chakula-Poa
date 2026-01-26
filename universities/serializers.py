from rest_framework import serializers
from .models import University

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = [
            'id', 'name', 'code', 'address', 'city',
            'contact_email', 'contact_phone', 'is_active', 'created_at'
        ]