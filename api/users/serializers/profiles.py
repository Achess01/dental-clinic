""" Specialist, Assistant and Secretary serializers """

# Django REST Framework
from rest_framework import serializers

# Models
from users.models import Specialist, Assistant, Secretary

# Serializers


class SpecialistDateAvailableModelSerializer(serializers.Serializer):
    date = serializers.DateTimeField()

    def create(self, validated_data):
        return validated_data['date']


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


class SecretaryModelSerializer(serializers.ModelSerializer):
    """ Secreatary model serializer """
    class Meta:
        model = Secretary
        fields = ['id']
