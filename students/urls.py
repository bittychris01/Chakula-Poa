from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, StudentVerificationViewSet

router = DefaultRouter()
router.register(r'', StudentViewSet, basename='student')
router.register(r'verifications', StudentVerificationViewSet, basename='student-verification')

urlpatterns = [
    path('', include(router.urls)),
]