from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser,MultiPartParser,FormParser
from .models import AccountModel,OTPStore
from .serializers import AccountSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.mail import send_mail
#from questions.models import paper
# from django.contrib.auth.hashers import check_password
#from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
import uuid
from datetime import datetime
from django.utils import timezone
class RegistrationView(APIView):
	parser_classes = [JSONParser]
	def post(self,request):
		try:
			dicti = {
				'username' : request.data['username'], #this username field means email
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
				else:
					user_det.delete()
					return Response({
							'message':'Registeration Failed',
							'payload':serializer.errors
						},status=400)
				return Response(data)					
			except:
				return Response({
						'message':'User Created'
						})

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

# class OTPverification(APIView):
# 	def post(self, request):
# 		email = request.data["email"]
# 		otp=uuid.uuid4().hex[:6].upper()
# 		subject ="OTP for CET Login"
# 		message = "Greetings from Common Enterance Test !! Here is your otp- " + otp
# 		send_mail(

#  			subject,
 			
#  			message,
 			

#  			'commonentrytest@gmail.com',
 			
#  			[email],
 			
#  			fail_silently= False,
#  			)
# 		return Response({"email": email,"otp" : otp}, status =200)

# class OTPView(APIView):
# 	def post(self, request):
# 		email= request.data['email']
# 		user= User.objects.filter(email=email)
# 		if (user.exists()):
# 			return Response({'message':'User already exists'
# 										},status=400)
# 		else:
# 			code=(str(uuid.uuid4()))[:8]
# 			otp = OTPStore.objects.create(
# 				email=email,
# 				otp=code,
# 				timestamp=datetime.now(timezone.utc)
# 				)
# 			otp.save()
		
# 		email = request.data["email"]
# 		otp=uuid.uuid4().hex[:6].upper()
# 		subject ="OTP for CET Login"
# 		message = "Greetings from Common Enterance Test !! Here is your otp- " + otp
# 		send_mail(

#  			subject,
 			
#  			message,
 			

#  			'commonentrytest@gmail.com'
#  			[email],
 			
#  			fail_silently= False,
#  			)
# 		return Response({"email": email,"otp" : otp}, status =200)





# class OTPVerify(APIView):
# 	def post(self, request):
# 		email=request.data['email']
# 		otp=request.data['otp']
# 		password=request.data['password']
# 		query=OTPStore.objects.filter(email=email,otp=otp).order_by('-timestamp')
# 		if (query.exists()):
# 			timestamp=query.values_lists('timestamp',flat=True)[0]
# 			duration=datetime.now.now(timezone.utc)- timestamp
# 			duration_in_s= duration.total_seconds()
# 			minutes=divmod(duration_in_s,60)[0]
# 			if (minutes<=5):
# 					parser_classes = [JSONParser]
# 					def post(self,request):
# 						try:
# 							dicti = {
# 							'username' : request.data['username'], #this username field means email
# 							'password' : request.data['password'],
# 							'first_name' : request.data['first_name'],
# 							'last_name' : request.data['last_name']}
# 							try:
# 								user = User(**dicti)
# 								user.set_password(request.data['password'])
# 								user.save()
# 								user_det = User.objects.filter(username = request.data['username'])
# 								request.data['user'] = user_det[0].id	
# 								serializer = AccountSerializer(data=request.data)
# 								data={}
# 								if serializer.is_valid():
# 									accounts = serializer.save()
# 									token = Token.objects.get(user=accounts).key
# 									data['token'] = token
# 								else:
# 									user_det.delete()
# 									return Response({
# 											'message':'Registeration Failed',
# 											'payload':serializer.errors
# 										},status=400)
# 								return Response(data)					
# 							except:
# 								return Response({
# 										'message':'User Created'
# 										})
# 						except:
# 							return Response({
# 											'message':'Enter All the Data'
# 										},status=400)
# 				#return Response({'message':'User verified succesfully.'},status=200)
			
# 			else:
# 				return Response({'message': 'time Out'},status=400)
# 		else:
# 			return Response({'message':"wrong OTP"}, status=400)
