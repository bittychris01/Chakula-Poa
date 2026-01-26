from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StaffViewSet, StaffScheduleViewSet

router = DefaultRouter()
router.register(r'', StaffViewSet, basename='staff')
router.register(r'schedules', StaffScheduleViewSet, basename='staff-schedule')

urlpatterns = [
    path('', include(router.urls)),
]