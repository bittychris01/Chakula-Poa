from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.dashboard_stats, name='admin-dashboard'),
    path('users/', views.user_list, name='admin-users'),
    path('users/<int:user_id>/toggle/', views.toggle_user_status, name='admin-toggle-user'),
]