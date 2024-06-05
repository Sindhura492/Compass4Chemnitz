from rest_framework import serializers
from chemnitz_api_backend.models import *
from django.contrib.auth.models import User
from django.db import IntegrityError

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password','first_name','last_name','email']
        extra_kwargs= {"password":{"write_only":True}}

    def create(self,validated_data):
        password = validated_data.pop('password')
        try:
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
            email=user.email
        )
        return user


