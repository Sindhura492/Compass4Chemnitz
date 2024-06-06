from rest_framework import serializers
from chemnitz_api_backend.models import *



class UserViewSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', read_only=True)
    class Meta:
        model = Users
        fields = ['user_id','user','user_name', 'first_name', 'last_name', 'email', 'is_active','role']
        extra_kwargs = {
            'user': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False}
        }