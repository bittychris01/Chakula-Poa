import uuid
from django.db import models
from universities.models import University
from users.models import User
from subscriptions.models import Subscriptions


class Meals(models.Model):
    MEAL_TYPE_CHOICES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    university_id = models.ForeignKey(University, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    meal_type = models.CharField(max_length=20, choices=MEAL_TYPE_CHOICES)
    description = models.TextField(blank=True)
    available_date = models.DateField()
    max_servings = models.IntegerField()
    current_orders = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class MealOrder(models.Model):
   STATUS_CHOICES = [
       ('pending', 'Pending'),
       ('confirmed', 'Confirmed'),
       ('served', 'Served'),
       ('canceled', 'Canceled'),
   ]
   id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
   user_id = models.ForeignKey(User, on_delete=models.CASCADE)
   meal_id = models.ForeignKey(Meals, on_delete=models.CASCADE)
   subscription_id = models.ForeignKey(Subscriptions, on_delete=models.CASCADE, blank=True, null=True)
   order_date = models.DateTimeField(auto_now_add=True)
   status = models.CharField(max_length=10, choices=STATUS_CHOICES)
   served_at = models.DateTimeField(blank=True, null=True)
   served_by = models.CharField(max_length=100, blank=True)
   created_at = models.DateTimeField(auto_now_add=True)