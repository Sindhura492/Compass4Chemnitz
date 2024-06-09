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
        return Response({"detail": "User deleted successfully."}, status=status.HTTP_200_OK)
    
class InactiveUserListView(generics.ListAPIView):
    queryset = Users.objects.filter(is_active=False)
    serializer_class = UserViewSerializer

class ChangeUserRole(APIView):
    def put(self, request, user_id):
        user_profile = get_object_or_404(Users, user_id=user_id)

        if user_profile.role == 2:
            user_profile.role = 1   
            message = "User role has been upgraded from Regular to Super!."
        elif user_profile.role == 1:
            try:
                UserAddress.objects.filter(user=user_profile).delete()
                Favorite.objects.filter(user=user_profile).delete()
            except:
                pass
            user_profile.role = 2
            message = "User role has been changed from Super to Regular!."

        user_profile.save()
        serializer = UserViewSerializer(user_profile)
        return Response({"detail": message, "data": serializer.data}, status=status.HTTP_200_OK)