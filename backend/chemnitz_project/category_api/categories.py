from rest_framework import generics
from chemnitz_api_backend.models import *
from .serializers import *
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView




class KindergartenView(APIView):
    def get(self, request, *args, **kwargs):
        kindergartens = Kindergarten.objects.all()
        serializer = KindergartenSerializer(kindergartens, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SchulennView(APIView):
    def get(self, request, *args, **kwargs):
        schules = Schulen.objects.all()
        serializer = SchulenSerializer(schules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class JugendberufshilfenView(APIView):
    def get(self, request, *args, **kwargs):
        jugendberufshilfens = Jugendberufshilfen.objects.all()
        serializer = JugendberufshilfenSerializer(jugendberufshilfens, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SchulsozialarbeitView(APIView):
    def get(self, request, *args, **kwargs):
        schulsozialarbeits = Schulsozialarbeit.objects.all()
        serializer = SchulsozialarbeitSerializer(schulsozialarbeits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CategoryFavoriteView(APIView):
    def get(self, request, user_id, *args, **kwargs):
        user = get_object_or_404(Users, user__id=user_id)
        favorite = user.favorite
        
        if favorite == 3:
            kindergartens = Kindergarten.objects.all()
            serializer = KindergartenSerializer(kindergartens, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        elif favorite == 4:
            schulen = Schulen.objects.all()
            serializer = SchulenSerializer(schulen, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        elif favorite == 5:
            socials = Jugendberufshilfen.objects.all()
            serializer = JugendberufshilfenSerializer(socials, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        elif favorite == 6:
            projects = Schulsozialarbeit.objects.all()
            serializer = SchulsozialarbeitSerializer(projects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        else:
            return Response({"detail": "No data available for this favorite category."}, status=status.HTTP_400_BAD_REQUEST)