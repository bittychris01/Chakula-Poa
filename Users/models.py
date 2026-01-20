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
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=150, blank=True)
    email = models.CharField(max_length=255,blank=True)
    role = models.CharField(max_length=20, blank=True, choices=ROLE_CHOICES)

    def __str__(self):
        return self.username
