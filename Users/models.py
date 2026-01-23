import uuid
from django.db import models
from Universities.models import Universities

class Users(models.Model):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('staff', 'Staff'),
        ('admin', 'Admin'),
        ('super_admin', 'Super Admin'),
        ('developer', 'Developer'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cps_number = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255,blank=True)
    phone_number = models.CharField(max_length=20)
    registration_number = models.CharField(max_length=50, blank=True)
    university_id = models.ForeignKey(Universities, on_delete=models.SET_NULL, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    password_hash = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    qr_code_data = models.TextField(blank=True)
    created_at =  models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['cps_number']),
            models.Index(fields=['phone_number']),
        ]

    def __str__(self):
        return self.full_name
