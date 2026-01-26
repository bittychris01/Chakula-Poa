from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/users/', include('users.urls')), 
    path('api/universities/', include('universities.urls')),
    path('api/plans/', include('subscriptions.urls')),
    path('api/subscriptions/', include('subscriptions.urls')),
    path('api/meals/', include('meals.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/staff/', include('staff.urls')),
    path('api/admin/', include('admin_api.urls')),
    path('api/students/', include('students.urls')),
]