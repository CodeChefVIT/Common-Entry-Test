from django.db import models
from django.conf import settings
import uuid 
from django.contrib.auth.models import User
from django.db.models.aggregates import Count
from random import randint
class questions(models.Model):
    id = models.UUIDField(default=uuid.uuid4,primary_key=True)
    #user = models.OneToOneField(User,on_delete=models.CASCADE)
    answer = models.CharField(max_length=1200)