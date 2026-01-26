from django.db import models
from django.conf import settings


class Staff(models.Model):
    STAFF_ROLES = [
        ('manager', 'Manager'),
        ('chef', 'Chef'),
        ('delivery', 'Delivery'),
        ('support', 'Support'),
    ]
    
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='staff_profile')
    role = models.CharField(max_length=20, choices=STAFF_ROLES)
    employee_id = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    hired_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = 'Staff'
    
    def __str__(self):
        return f"{self.user.email} - {self.role}"


class StaffSchedule(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='schedules')
    day_of_week = models.IntegerField()  # 0=Monday, 6=Sunday
    start_time = models.TimeField()
    end_time = models.TimeField()
    
    class Meta:
        unique_together = ['staff', 'day_of_week']
    
    def __str__(self):
        return f"{self.staff} - Day {self.day_of_week}"