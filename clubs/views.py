from django.shortcuts import render
from rest_framework import generics

from .models import Clubs
from .serializers import ClubsSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,filters



class ClubsAPIView(generics.ListCreateAPIView):
    queryset = Clubs.objects.all()
    serializer_class = ClubsSerializer
    search_fields = ['name','fullname']
    filter_backends = (filters.SearchFilter,)
# Create your views here.
@api_view(["POST"])
def show_list(request):
	if (request.method=="POST"):
		serializers=ClubsSerializer(data=request.data)
		if (serializers.is_valid()):
			serializers.save()
			return Response(serializers.data,status=status.HTTP_201_CREATED)
		return Response(serializers.errors,status=status.HTTP_BAD_REQUEST)