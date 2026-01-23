from django.urls import path
from .views import UserRegisterView, UserLoginView, UserViewList

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('users_list/', UserViewList.as_view(), name='users_list'),
]