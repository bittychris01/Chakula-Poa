import uuid
from django.db import models

class User(models.Model):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('staff', 'Staff'),
        ('admin', 'Admin'),
        ('super_admin', 'Super Admin'),
        ('developer', 'Developer'),

    ]
