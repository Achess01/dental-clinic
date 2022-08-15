""" Patients serializers """

# Django REST Framework
from rest_framework import serializers

# Models
from attention.models import Patient


class PatientModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
