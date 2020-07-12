from django.db import models
from django.conf import settings
import uuid 
from django.contrib.auth.models import User
from django.db.models.aggregates import Count
from random import randint
class questions(models.Model):
    id = models.UUIDField(default=uuid.uuid4,primary_key=True)
    #user = models.OneToOneField(User,on_delete=models.CASCADE)
    question = models.CharField(max_length=1200)
    #owner= models.ForeignKey(User,related_name="question_bank",on_delete=models.CASCADE, null=True)
    
    # def __str__(self):
    #     return self.name

# class RandomManager(models.Manager):
#     def random(self):
#         count= self.aggregate(count=Count("id"))['count']
#         random_index= randint(0,count-1)
#         return self.all()[random_index]