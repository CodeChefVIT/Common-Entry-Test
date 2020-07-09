from django.urls import path

from . import views

urlpatterns = [
    path('ask/', views.Questions.as_view()),

]