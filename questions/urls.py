from django.urls import path

from . import views
#from questions.models import MyRandom
urlpatterns = [
    path('ask/', views.Questions.as_view()),
    path('quest/',views.RandomQuestionSender.as_view()),

]