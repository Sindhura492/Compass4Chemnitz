from rest_framework import generics
from chemnitz_api_backend.models import *
from .serializers import *
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView


class KindergartenView(APIView):
 def get(self, request, *args, **kwargs):
        user_id = request.user.id
        kindergartens = Schulsozialarbeit.objects.all()
        favorite_items = Favorite.objects.filter(user=user_id, category=1, item__in=kindergartens.values_list('ID', flat=True)).values_list('item', flat=True)
        
        serializer = SchulenSerializer(kindergartens, many=True)
        data = serializer.data

        for item in data:
            item['is_favorite'] = item['ID'] in favorite_items
            item['category'] = '1'
        
        return Response(data, status=status.HTTP_200_OK)

class JugendberufshilfenView(APIView):
 def get(self, request, *args, **kwargs):
        user_id = request.user.id
        jugendberufshilfens = Schulsozialarbeit.objects.all()
        favorite_items = Favorite.objects.filter(user=user_id, category=2, item__in=jugendberufshilfens.values_list('ID', flat=True)).values_list('item', flat=True)
        
        serializer = SchulenSerializer(jugendberufshilfens, many=True)
        data = serializer.data

        for item in data:
            item['is_favorite'] = item['ID'] in favorite_items
            item['category'] = '3'
        
        return Response(data, status=status.HTTP_200_OK)
    

class SchulsozialarbeitView(APIView):
 def get(self, request, *args, **kwargs):
        user_id = request.user.id
        schulsozialarbeits = Schulsozialarbeit.objects.all()
        favorite_items = Favorite.objects.filter(user=user_id, category=4, item__in=schulsozialarbeits.values_list('ID', flat=True)).values_list('item', flat=True)
        
        serializer = SchulenSerializer(schulsozialarbeits, many=True)
        data = serializer.data

        for item in data:
            item['is_favorite'] = item['ID'] in favorite_items
            item['category'] = '4'
        
        return Response(data, status=status.HTTP_200_OK)
    
class SchulennView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = request.user.id
        schulen = Schulen.objects.all()
        favorite_items = Favorite.objects.filter(user=user_id, category=2, item__in=schulen.values_list('ID', flat=True)).values_list('item', flat=True)
        
        serializer = SchulenSerializer(schulen, many=True)
        data = serializer.data

        for item in data:
            item['is_favorite'] = item['ID'] in favorite_items
            item['category'] = '2'
        
        return Response(data, status=status.HTTP_200_OK)
    