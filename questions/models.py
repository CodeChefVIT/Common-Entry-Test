from django.db import models
from django.conf import settings
import uuid 
from django.contrib.auth.models import User
class questions(models.Model):
    id = models.UUIDField(default=uuid.uuid4,primary_key=True)
    #user = models.OneToOneField(User,on_delete=models.CASCADE)
    question = models.CharField(max_length=1200)
    #owner= models.ForeignKey(User,related_name="question_bank",on_delete=models.CASCADE, null=True)
    
    # def __str__(self):
    #     return self.name