from django.shortcuts import render
from rest_framework import generics

from .models import questions
from .serializers import questionsSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,filters
from rest_framework.views import APIView

# Create your views here.
#@api_view(["POST"])
# def show_list(request):
# 	if (request.method=="POST"):
# 		serializers=questionsSerializer(data=request.data)
# 		if (serializers.is_valid()):
# 			serializers.save(owner=self.requst.user)
# 			return Response(serializers.data,status=201) #instead of status=status.HTTP_201_CREATED)
# 		return Response(serializers.errors,status=400)

class Questions(APIView):
	def post(self, request):
		serializers=questionsSerializer(data=request.data)
		if (serializers.is_valid()):
			serializers.save()#owner=self.request.user)
			return Response(serializers.data,status=201) 
		return Response(serializers.errors,status=400)

		

