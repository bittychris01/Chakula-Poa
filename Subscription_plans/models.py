import uuid
from django.db import models
from Universities.models import Universities


class SubscriptionPlan(models.Model):
    ROLE_CHOICES = [
        ('day', 'Day'),
        ('week', 'Week'),
        ('month', 'Month'),
        ('semester', 'Semester')
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    university_id = models.ForeignKey(Universities, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    duration_type = models.CharField(max_length=20, choices=ROLE_CHOICES)
    duration_days = models.IntegerField(unique=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, unique=True, default=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

    
    
