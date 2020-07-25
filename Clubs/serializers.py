
from rest_framework import serializers
from Clubs.models import Clubs


class ClubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = '__all__'


