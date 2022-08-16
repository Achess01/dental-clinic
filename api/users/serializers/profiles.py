""" Specialist, Assistant and Secretary serializers """

# Django REST Framework
from rest_framework import serializers

# Models
from users.models import Specialist, Assistant, Secretary


class SpecialistModelSerializer(serializers.ModelSerializer):
    """ Specialist model serializer """
    class Meta:
        model = Specialist
        fields = ['id', 'speciality']


class AssistantModelSerializer(serializers.ModelSerializer):
    """ Assistant model serializer """
    class Meta:
        model = Assistant
        fields = ['id', 'specialist']
