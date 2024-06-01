from chemnitz_api_backend.models import *
from .serializers import *
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny


class UserCreate(generics.ListCreateAPIView):
    serializer_class=UserViewSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        users=self.request.user
        return Users.objects.filter(user_id=users)
    
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(user_id=self.request.users)
        else:
            print(serializer.errors)

class UserDelete(generics.DestroyAPIView):
    serializer_class=UserViewSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        users=Users.objects.all()
        return Users.objects.filter(user_id=users)











# def get_user_id(request):
#     try:
#         return request.user.user_id
#     except Exception as ex:
#         print("Exception", ex)
#         return None
    
# def get_user_name(request):
#     user_id = get_user_id(request)
#     user = User.objects.get(user_id=user_id)
#     user_name = user.first_name + " " + user.last_name
#     return user_name


# def get_user_role(request):
#     # temperary code
#     try:
#         user_id = get_user_id(request)
#         role = User.objects.get(user_id=user_id).role
#         return role
#     except Exception as ex:
#         return None
    
# def get_email(request):
#     try:
#         user_id = get_user_id(request)
#         email = User.objects.get(user_id=user_id).email
#         return email
#     except Exception as ex:
#         return None
    
# def address1(request):
#     try:
#         user_id = get_user_id(request)
#         address1 = User.objects.get(user_id=user_id).address1
#         return address1
#     except Exception as ex:
#         return None


# def address2(request):
#     try:
#         user_id = get_user_id(request)
#         address2 = User.objects.get(user_id=user_id).address2
#         return address2
#     except Exception as ex:
#         return None

# def address3(request):
#     try:
#         user_id = get_user_id(request)
#         address3 = User.objects.get(user_id=user_id).address3
#         return address3
#     except Exception as ex:
#         return None

