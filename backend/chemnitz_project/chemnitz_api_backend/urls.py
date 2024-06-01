from django.urls import path
from user_api import users



urlpatterns = [
   path('users/',users.UserCreate.as_view(), name='users'),
   path('users/delete/<int:pk>', users.UserDelete.as_view(), name='user_delete'),
]