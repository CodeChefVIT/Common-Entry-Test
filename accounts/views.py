from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser,MultiPartParser,FormParser
from .models import AccountModel
from .serializers import AccountSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
#from questions.models import paper
# from django.contrib.auth.hashers import check_password
#from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token


class RegistrationView(APIView):
	parser_classes = [JSONParser]
	def post(self,request):
		try:
			dicti = {
				'username' : request.data['username'],
				'password' : request.data['password'],
				'first_name' : request.data['first_name'],
				'last_name' : request.data['last_name']
			}
			try:
				user = User(**dicti)
				user.set_password(request.data['password'])
				user.save()
				user_det = User.objects.filter(username = request.data['username'])
				request.data['user'] = user_det[0].id	
				serializer = AccountSerializer(data=request.data)
				data={}
				if serializer.is_valid():
					accounts = serializer.save()
					token = Token.objects.get(user=accounts).key
					data['token'] = token
					# data['response'] = "succesfully registered"
					# return Response(data)
						# 	'message':'Succesfully Registered'
						# },status=201)
				else:
					user_det.delete()
					return Response({
							'message':'Registeration Failed',
							'payload':serializer.errors
						},status=400)
				return Response(data)					
			except:
				return Response({
						'message':'User Already Exists'
						},status=400)
		except:
			return Response({
					'message':'Enter All the Data'
				},status=400)

# class LoginView(APIView):
# 	parser_classes=[JSONParser]
# 	# authentication_classes = [SessionAuthentication, BasicAuthentication]
# 	permission_classed = [IsAuthenticated]
    
# 	def get(request,user):
# 		try:
# 			user_det = User.objects.filter(username = request.data['username'])
# 			temp = request.data['password']
# 			# currentpassword= request.user.password #user's current password
# 			match_check = check_password(temp , user_det['password'])
# 			if (match_check):
# 				return response({
# 						'message' : 'Succesfully Logged In'
# 					},status=200)
# 			else:
# 				return respone({
# 						'message':'Wrong Password Entered'

# 					},status=400)

# 			# if user_det['password'] == temp:
# 			# 	return response({
# 			# 			'message':'Succesfully Logged In'
# 			# 		},status=200)
# 			# else:
# 			# 	return respone({
# 			# 			'message':'Wrong Password Entered'

# 			# 		},status=400)
# 			# print(user_det)
# 		except:
# 			return respone({
# 					'message':'User Does Not Exist'
# 				},status=400)
			
class ProfileView(APIView):
	parser_classes = [JSONParser]
	permission_classed = [IsAuthenticated]
	def get(self,request):
		query = AccountModel.objects.filter(user=request.user)
		seraializer = AccountSerializer(query,many=True)
		return respone(serializer.data,status=200)

# class PaperView(APIView):
# 	parser_classes = [JSONParser]
# 	def get(request,user):
# 		serializer = PaperSerializer(data = request.data)
# 		if serializer.is_valid():
# 			serializer.save()
# 			return Response({
# 					'message' : 'Succesfully Submitted'
# 				},status = 200)
# 		else:
# 			return Response({
# 					'message' : 'Enter All the Data'
# 				},status = 400)

