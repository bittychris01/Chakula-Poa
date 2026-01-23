from django.urls import path
from .views import UniversityListView, UniversityCreateView

urlpatterns = [

    path('university_list/', UniversityListView.as_view(), name='university-list'),
    path('university_create/', UniversityCreateView.as_view(), name='university-create'),
]