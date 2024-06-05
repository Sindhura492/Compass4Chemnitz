from rest_framework import serializers
from chemnitz_api_backend.models import *


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': True},
            'category': {'required': True},
            'item': {'required': True},
            'TRAEGER': {'required': False},
            'BEZEICHNUNG': {'required': False},
            'KURZBEZEICHNUNG': {'required': False},
            'created_at': {'required': False},
            'STRASSE': {'required': False},
            'TELEFON': {'required': False},
            'PLZ': {'required': False},
            'ORT': {'required': False},
            'EMAIL': {'required': False}
        }