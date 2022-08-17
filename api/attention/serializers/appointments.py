""" Appointment serializers """

# Django REST Framework
from rest_framework import serializers

# Models
from attention.models import Appointment, Record
from users.models import Secretary

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
            'secretary'
        ]

        read_only_fields = ['secretary']

    def validate_date(self, value_date):
        """
            Verify date is not in the past            
        """

        # Only create appointments at least 30 minutes before
        min_date = timezone.now() + timedelta(minutes=30)
        if value_date < min_date:
            raise serializers.ValidationError(
                'Appointment must be created at least 30 minutes before'
            )
        return value_date

    def validate(self, data):
        """ 
            The specialist is available,
            and the patient is available,
        """
        date = data['date']
        min_date = date - timedelta(minutes=59)
        max_date = date + timedelta(minutes=59)

        patient = data['patient']
        specialist = data['specialist']

        if Appointment.objects.filter(
            date__gte=min_date,
            date__lte=max_date,
            patient=patient
        ).exists():
            raise serializers.ValidationError(
                'This patient has already an appointment 1 hour near this appointment'
            )

        if Appointment.objects.filter(
            date__gte=min_date,
            date__lte=max_date,
            specialist=specialist
        ).exists():
            raise serializers.ValidationError(
                'This specialist has already an appointment 1 hour near this appointment'
            )

        return data

    def create(self, validated_data):
        """ Create a record too """
        user = self.context['request'].user
        secretary = Secretary.objects.get(user=user)
        validated_data['secretary'] = secretary
        appointment = super().create(validated_data)
        # paid?
        Record.objects.create(appointment=appointment, vouche_state="PENDING")
        return appointment


class AppointmentUpdateModelSerializer(serializers.ModelSerializer):
    """ Update appointment """
    class Meta:
        model = Appointment
        fields = ['data', 'specialist']

    # Validate for available hours (1 hour between appointments for specialist)
