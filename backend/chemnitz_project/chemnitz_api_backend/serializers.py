from rest_framework import serializers
from chemnitz_api_backend.models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        extra_kwargs= {"password":{"write_only":True}}

    def create(self,validated_data):
        user=User.objects.create_user(**validated_data)
        return user


