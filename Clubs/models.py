from django.db import models
from django.conf import settings

class Clubs(models.Model):
    name = models.CharField(max_length=200)
    fullname = models.CharField(max_length=300, null=True)

    def __str__(self):
        return self.name