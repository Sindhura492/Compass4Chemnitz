from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework import serializers
from rest_framework.exceptions import ValidationError





class CreateUserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]



    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except ValidationError as e:
            detail = e.detail if isinstance(e.detail, str) else list(e.detail.values())[0][0]
            return Response({"detail": detail}, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            if 'UNIQUE constraint failed' in str(e):
                return Response({"detail": "A user with that username already exists."}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)