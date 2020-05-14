from django.db import models
import uuid 
from django.contrib.auth.models import User


# Create your models here.
class AccountModel(models.Model):
	id = models.UUIDField(default=uuid.uuid4,primary_key=True)
	user = models.OneToOneField(User,on_delete=models.CASCADE)
	domain = models.CharField(max_length=50)
	registration_number = models.CharField(max_length=50)
	phone  = models.CharField(max_length=20,default=0)
	text = models.BooleanField(default=False)
