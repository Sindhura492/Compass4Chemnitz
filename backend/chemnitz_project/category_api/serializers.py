from rest_framework import serializers
from chemnitz_api_backend.models import *

class KindergartenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kindergarten
        fields = '__all__'

class SchulenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schulen
        fields = '__all__'

class JugendberufshilfenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jugendberufshilfen
        fields = '__all__'

class SchulsozialarbeitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schulsozialarbeit
        fields = '__all__'
