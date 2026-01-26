from django.contrib import admin
from .models import Staff, StaffSchedule


@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'role', 'employee_id', 'is_active', 'hired_date']
    list_filter = ['role', 'is_active', 'department']
    search_fields = ['user__email', 'employee_id']


@admin.register(StaffSchedule)
class StaffScheduleAdmin(admin.ModelAdmin):
    list_display = ['id', 'staff', 'day_of_week', 'start_time', 'end_time']