from django.db import models
import uuid 
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.

class AccountModel(models.Model):
	id = models.UUIDField(default=uuid.uuid4,primary_key=True)
	user = models.OneToOneField(User,on_delete=models.CASCADE)
	domain = models.CharField(max_length=50)
	registration_number = models.CharField(max_length=50)
	phone  = models.CharField(max_length=20,default=0)
	text = models.BooleanField(default=False)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance = None, created = False, **kwargs):
	if created:
		Token.objects.create(user=instance)
