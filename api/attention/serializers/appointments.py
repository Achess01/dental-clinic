""" Appointment serializers """

# Django REST Framework
from rest_framework import serializers

# Models
from attention.models import Appointment

# Utilities
from datetime import timedelta
from django.utils import timezone


class AppointmentModelSerializer(serializers.ModelSerializer):
    """ Appointment Model Serializer """
    class Meta:
        model = Appointment
        fields = [
            'date',
            'specialist',
            'patient',
        ]

    def validate_date(self, value_date):
        """ Verify date is not in the past,
            the specialist is available,
            and the patient is available,
        """

        # Only create appointments at least 30 minutes before
        min_date = timezone.now() + timedelta(minutes=30)
        if value_date < min_date:
            raise serializers.ValidationError(
                'Appointment must be created at least 30 minutes before'
            )

        return value_date

    def create(self, validated_data):
        return super().create(validated_data)
    # Validate for available hours (1 hour between appointments for specialist)


class AppointmentUpdateModelSerializer(serializers.ModelSerializer):
    """ Update appointment """
    class Meta:
        model = Appointment
        fields = ['data', 'specialist']

    # Validate for available hours (1 hour between appointments for specialist)
