from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from user_api.serializers import *
from chemnitz_api_backend.models import Users
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User




class UserProfileUserIdView(generics.RetrieveAPIView):
    queryset = Users.objects.all()
    serializer_class = UserViewSerializer

    
    def get(self, request, user_id):
        user = get_object_or_404(Users, id=user_id)
        serializer = UserViewSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def put(self, request, user_id):
        user = get_object_or_404(Users, id=user_id)
        serializer = UserViewSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteUserView(generics.UpdateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserViewSerializer

    def update(self, request, user_id):
        user = get_object_or_404(Users, id=user_id)
        user.is_active = False 
        user.save()

        auth_user = User.objects.get(id=user.id)
        auth_user.is_active = False
        auth_user.save()
        serializer = self.get_serializer(user)
        return Response({"message": "User deleted successfully."}, status=status.HTTP_200_OK)
    
class InactiveUserListView(generics.ListAPIView):
    queryset = Users.objects.filter(is_active=False)
    serializer_class = UserViewSerializer