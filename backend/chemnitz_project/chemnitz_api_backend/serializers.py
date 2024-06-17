from rest_framework import serializers
from chemnitz_api_backend.models import *
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from chemnitz_api_backend.validators import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password','first_name','last_name','email']
        extra_kwargs= {"password":{"write_only":True}}   

    def validate_email(self, value):
        try:
            validate_email(value)
        except ValueError as e:
            raise serializers.ValidationError(str(e))
        return value

    def create(self,validated_data):
        password = validated_data.pop('password')
        email = validated_data.get('email')
        
        try:
            validate_password(password)
        except ValueError as e:
            raise serializers.ValidationError({"password": e.args[0]})
        
        try:
            error_message = "A user with this email already exists."
            if User.objects.filter(email=email).exists():
                raise serializers.ValidationError({"detail": [error_message]})
            user=User.objects.create_user(password=password,**validated_data)
        except IntegrityError as e:
            if 'UNIQUE constraint failed' in str(e):
                raise serializers.ValidationError({"detail": "A user with that username already exists."})
            raise e
        Users.objects.create(
            user=user,
            user_name=user.username,
            password=password,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
        )
        return user

