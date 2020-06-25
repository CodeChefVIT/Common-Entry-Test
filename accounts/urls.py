from django.contrib import admin
from django.urls import path,include
from . import views

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns=[
	path('',include('djoser.urls')),
	path('',include('djoser.urls.authtoken')),
	path('signup/',views.RegistrationView.as_view()),
	# path('login/',views.ProfileView.as_view()),
	path('login/',obtain_auth_token),
	path('verification/',views.OTPverification.as_view()),
	# path('paper/',views.PaperView.as_view()),
]
