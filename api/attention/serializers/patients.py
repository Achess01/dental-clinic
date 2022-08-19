""" Patients serializers """

# Django REST Framework
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

# Models
from attention.models import Patient

# Utils
from utils.validators import rut_regex_validator


class PatientModelSerializer(serializers.ModelSerializer):

    rut = serializers.CharField(
        validators=[
            rut_regex_validator(),
            UniqueValidator(queryset=Patient.objects.all())
        ]
    )

    class Meta:
        model = Patient
        fields = '__all__'
        read_only_fields = ['is_active']


class PatientUpdateModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = [
            'first_name',
            'last_name',
            'birthday',
            'age',
            'occupation',
            'address',
        ]
