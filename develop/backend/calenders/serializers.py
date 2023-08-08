from rest_framework import serializers
from .models import PrivateCalender

class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivateCalender
        fields = ("start_date","end_date","name", "state","genre",)