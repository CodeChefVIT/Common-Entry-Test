from rest_framework import serializers
from .models import AccountModel
#from questions.models import paper


class AccountSerializer(serializers.ModelSerializer):
	class Meta:
		model = AccountModel
		fields = '__all__'

# class PaperSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = paper
# 		fields = '__all__'