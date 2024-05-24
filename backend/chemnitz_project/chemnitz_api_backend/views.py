from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *
from rest_framework.response import Response
# Create your views here.



# def main(request):
#     return HttpResponse('hello we are chaital and sindhura')



class CrudViewset(viewsets.ViewSet):
    permission_classes=[permissions.AllowAny]
    queryset=Crud.objects.all()
    serializer_class=CrudSerializer
    def list(self, request):
        queryset=self.queryset
        serializer=self.serializer_class(queryset,many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        list=self.queryset.get(pk=pk)
        serializer_data=self.serializer_class(list)
        return Response(serializer_data.data)


    def update(self, request, pk=None):
        list=self.queryset.get(pk=pk)
        serializer_data=self.serializer_class(list,data=request.data)
        if serializer_data.is_valid():
            serializer_data.save()
            return Response(serializer_data.data)
        else:
            return Response(serializer_data.errors, status=400)

    def destroy(self, request, pk=None):
        list=self.queryset.get(pk=pk)
        list.delete()
        return Response(status=204)
