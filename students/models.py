from django.db import models
from django.conf import settings


class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    student_id = models.CharField(max_length=20, unique=True)
    university = models.ForeignKey('universities.University', on_delete=models.SET_NULL, null=True, related_name='students')
    course = models.CharField(max_length=200, blank=True)
    year_of_study = models.IntegerField(null=True, blank=True)
    room_number = models.CharField(max_length=50, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.email} - {self.student_id}"


class StudentVerification(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='verifications')
    document_type = models.CharField(max_length=50)
    document_url = models.URLField()
    is_approved = models.BooleanField(default=False)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Verification for {self.student}"