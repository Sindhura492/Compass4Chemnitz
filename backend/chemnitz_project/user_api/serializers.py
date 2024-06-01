from rest_framework import serializers
from chemnitz_api_backend.models import *
from chemnitz_api_backend.models import *

class UserViewSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Users
        fields = ['id','user_name','password','first_name', 'last_name', 'email', 'role','address1','address2','address3']
        extra_kwargs={"password":{"read_only":True}}
        

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
