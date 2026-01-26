from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
import uuid


class UserSerializer(serializers.ModelSerializer):
    university_name = serializers.CharField(source='university.name', read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'cps_number', 'first_name', 'last_name', 
            'phone_number', 'email', 'registration_number', 
            'university', 'university_name', 'role', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'username', 'cps_number', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    # Accept 'university' from frontend (the UUID)
    university = serializers.UUIDField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'phone_number', 'email', 
            'registration_number', 'university', 'password'
        ]
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': False, 'allow_blank': True},
            'phone_number': {'required': True},
            'email': {'required': False, 'allow_blank': True},
            'registration_number': {'required': False, 'allow_blank': True, 'allow_null': True},
        }

    def create(self, validated_data):
        university_id = validated_data.pop('university', None)
        password = validated_data.pop('password')
        
        # Generate unique username from phone_number
        username = validated_data.get('phone_number')
        
        # Generate CPS number
        cps_number = f"CPS{str(uuid.uuid4().int)[:8]}"
        
        user = User(
            username=username,
            cps_number=cps_number,
            **validated_data
        )
        
        if university_id:
            user.university_id = university_id
            
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField()


class AuthResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()
    user = UserSerializer()
    cps_number = serializers.CharField(required=False)