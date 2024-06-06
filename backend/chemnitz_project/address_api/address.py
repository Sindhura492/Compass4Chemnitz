from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from chemnitz_api_backend.models import *
from .serializers import AddressSerializer
from geopy.geocoders import GoogleV3
from django.conf import settings




class AddressCreateView(APIView):
    def post(self, request, *args, **kwargs):
        api_key = settings.GOOGLE_MAPS_API_KEY
        address_data = request.data
        
        address_string = f"{address_data.get('house_no', '')} {address_data.get('street_name', '')}, {address_data.get('city', '')}, {address_data.get('state', '')}, {address_data.get('country', '')}"
        geolocator = GoogleV3(api_key=api_key)
        location = geolocator.geocode(address_string)
        
        if location:
            address_data['latitude'] = location.latitude
            address_data['longitude'] = location.longitude
        else:
            return Response({"message": "Could not calculate distance, please give more accurate address."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = AddressSerializer(data=address_data)
        if serializer.is_valid():
            address = serializer.save()

            user = address.user
            if user.addresses.count() > 1:
                user.role = Users.POWER_USER
                user.save()
            
            return Response({"message":"Address added successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


    
    def get(self, request, user_id, *args, **kwargs):
        if not UserAddress.objects.filter(user_id=user_id).exists():
            return Response({"message": "Please add atleast one  address to calculate distances.."}, status=status.HTTP_400_BAD_REQUEST)
        addresses = UserAddress.objects.filter(user=user_id)
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def delete(self, request, address_id, *args, **kwargs):
        try:
            address = UserAddress.objects.get(id=address_id)
        except UserAddress.DoesNotExist:
            return Response({"message": "Address not found."}, status=status.HTTP_404_NOT_FOUND)

        address.delete()
        return Response({"message":"Address deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
