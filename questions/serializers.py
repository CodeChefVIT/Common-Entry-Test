
from rest_framework import serializers
from questions.models import questions


class questionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = questions
        fields = '__all__'

