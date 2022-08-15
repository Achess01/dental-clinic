""" Appointment serializers """

# Django REST Framework
from rest_framework import serializers

# Models
from attention.models import Appointment


class AppointmentModelSerializer(serializers.ModelSerializer):
    """ Appointment Model Serializer """
    class Meta:
        model = Appointment
        fields = '__all__'

    # Validate for available hours (1 hour between appointments for specialist)