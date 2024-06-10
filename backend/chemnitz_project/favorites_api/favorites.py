from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from chemnitz_api_backend.models import Favorite
from .serializers import FavoriteSerializer
from chemnitz_api_backend.models import *
from category_api.serializers import *
from django.shortcuts import get_object_or_404

class FavoriteView(APIView):
    def post(self, request):
        user = request.data.get('user')
        category = request.data.get('category')
        item = request.data.get('item')
        user_profile = get_object_or_404(Users, user_id=user)

        if user_profile.role == 2 and Favorite.objects.filter(user=user).exists():
            return Response({'detail': 'Regular users can add only one favorite!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            category = int(category)
        except (TypeError, ValueError):
            return Response({'detail': 'Category must be an integer'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            existing_favorite = Favorite.objects.get(user=user, category=category, item=item)
            return Response({'detail': 'Favorite already exists'}, status=status.HTTP_400_BAD_REQUEST)
        except Favorite.DoesNotExist:
            pass

        if category == 1:
            try:
                item_data = Kindergarten.objects.get(ID=item)
            except Kindergarten.DoesNotExist:
                return Response({'detail': 'Kindergarten item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        elif category == 2:
            try:
                item_data = Schulen.objects.get(ID=item)
            except Schulen.DoesNotExist:
                return Response({'detail': 'Schule item not found'}, status=status.HTTP_404_NOT_FOUND)

        elif category == 3:
            try:
                item_data = Jugendberufshilfen.objects.get(ID=item)
            except Jugendberufshilfen.DoesNotExist:
                return Response({'detail': 'Jugendberufshilfen item not found'}, status=status.HTTP_404_NOT_FOUND)  

        elif category == 4:
            try:
                item_data = Schulsozialarbeit.objects.get(ID=item)
            except Schulsozialarbeit.DoesNotExist:
                return Response({'detail': 'Schulsozialarbeit item not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'detail': 'Invalid category'}, status=status.HTTP_400_BAD_REQUEST)


        data = {
                'user': user,
                'category': category,
                'item': item,
                'TRAEGER': item_data.TRAEGER if item_data.TRAEGER != 'nan' else None,
                'BEZEICHNUNG': item_data.BEZEICHNUNG if item_data.BEZEICHNUNG != 'nan' else None,
                'KURZBEZEICHNUNG': item_data.KURZBEZEICHNUNG if item_data.KURZBEZEICHNUNG != 'nan' else None,
                'STRASSE': item_data.STRASSE if item_data.STRASSE != 'nan' else None,
                'TELEFON': item_data.TELEFON if item_data.TELEFON != 'nan' else None,
                'PLZ': item_data.PLZ if item_data.PLZ != 'nan' else None,
                'ORT': item_data.ORT if item_data.ORT != 'nan' else None,
                'EMAIL': item_data.EMAIL if item_data.EMAIL != 'nan' else None,
        }

        serializer = FavoriteSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Favorite created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

   
    def get(self, request, user_id):
        favorites = Favorite.objects.filter(user=user_id)
        if not favorites:
            return Response({'detail': 'No favorites found for this user'}, status=status.HTTP_200_OK)
        serializer = FavoriteSerializer(favorites, many=True)
        return Response(serializer.data)
    

    def delete(self, request, user_id):
        category = request.data.get('category')
        item = request.data.get('item')

        if not category or not item:
            return Response({'detail': 'Category and item are required to delete a favorite'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            favorite = Favorite.objects.get(user=user_id, category=category, item=item)
            favorite.delete()
            return Response({'detail': 'Favorite deleted successfully'}, status=status.HTTP_200_OK)
        except Favorite.DoesNotExist:
            return Response({'detail': 'Favorite not found'}, status=status.HTTP_404_NOT_FOUND)
        


    


        

