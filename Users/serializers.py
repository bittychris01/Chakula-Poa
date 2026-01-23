from rest_framework import serializers
from .models import Users
from django.contrib.auth.hashers import make_password, check_password

class UsersRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = ['id', 'cps_number', 'full_name', 'email', 'phone_number', 'registration_number', 'university_id', 'role', 'password', 'is_active', 'qr_code_data', 'created_at']

    def create(self, validated_data):
        password =validated_data.pop('password')
        validated_data['password_hash'] = make_password(password)
        return Users.objects.create(**validated_data)
        

class UsersLoginSerializer(serializers.Serializer):
    cps_number = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        cps_number = data.get("cps_number")
        password = data.get("password")

        try:
            user = Users.objects.get(cps_number=cps_number)
        except Users.DoesNotExist:
            raise serializers.ValidationError("Invalid CPS number or password")

        if not check_password(password, user.password_hash):
            raise serializers.ValidationError("Invalid CPS number or password")

        data["user"] = user
        return data