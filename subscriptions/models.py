import uuid
from django.db import models
from users.models import User
from subscription_plans.models import SubscriptionPlan


class Subscriptions(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('canceled', 'Canceled'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    plan_id =models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True, unique=True)
    end_date = models.DateTimeField(auto_now_add=True, unique=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    remaining_meals = models.IntegerField(blank=True, null=True)
    payment_reference = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_id.full_name} - {self.plan.name}"


