from rest_framework import serializers
from chemnitz_api_backend.models import *


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ['id', 'house_no', 'street_name', 'postalcode', 'city', 'state', 'country', 'latitude', 'longitude', 'user']
