from .models import Universities
from rest_framework import serializers

class UniversitiesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Universities
        fields = ['id', 'name', 'code', 'address', 'city', 'contact_email', 'contact_phone', 'is_active','created_at']
