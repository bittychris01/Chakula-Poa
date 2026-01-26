from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    cps_number = models.CharField(max_length=20, unique=True, blank=True, null=True)
    phone_number = models.CharField(max_length=20, unique=True)
    registration_number = models.CharField(max_length=50, unique=True, null=True)

    university = models.ForeignKey('universities.University', on_delete=models.SET_NULL, null=True, blank=True)
    role = models.CharField(max_length=20, choices=[
        ('student', 'Student'),
        ('admin', 'Admin'),
        ('canteen_staff', 'Canteen Staff'),
    ], default='student')
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email or self.username

