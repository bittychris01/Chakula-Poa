from django.contrib import admin
from .models import Student, StudentVerification


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'student_id', 'university', 'is_verified', 'created_at']
    list_filter = ['is_verified', 'university', 'year_of_study']
    search_fields = ['user__email', 'student_id']


@admin.register(StudentVerification)
class StudentVerificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'student', 'document_type', 'is_approved', 'created_at']
    list_filter = ['is_approved', 'document_type']