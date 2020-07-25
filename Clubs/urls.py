from django.urls import path

from . import views

urlpatterns = [
    path('search/', views.clubsAPIView.as_view()),
    path('enter/', views.show_list),

]