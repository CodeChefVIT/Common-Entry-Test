from django.urls import path

from . import views

urlpatterns = [
    path('search/', views.ClubsAPIView.as_view()),
    path('enter/', views.show_list),

]