from django.shortcuts import render
from rest_framework import generics

from .models import questions
from .serializers import questionsSerializer,RandomquestSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,filters
from rest_framework.views import APIView
import random

class Questions(APIView):
	def post(self, request):
		serializers=questionsSerializer(data=request.data)
		if (serializers.is_valid()):
			serializers.save()#owner=self.request.user)
			return Response(serializers.data,status=201) 
		return Response(serializers.errors,status=400)

		
class RandomQuestionSender(APIView):
	def post(self, request):
		queryset=questions.objects.all()
		random_questions_to_send=random.sample(queryset,10)
		serializers=questionsSerializer(random_questions_to_send,many=True)
		return Response(serializers.data,status=200)

		
