""" Appointment serializers """

# Django REST Framework
from rest_framework import serializers

# Models
from attention.models import Appointment, Record, Patient
from users.models import Secretary, Specialist, Assistant

# Utilities
from datetime import timedelta
from django.utils import timezone

# Serializers
from .patients import PatientModelSerializer
from users.serializers import UserModelSerializer

""" Display specialists """


class SpecialistDisplayModelSerializer(serializers.ModelSerializer):
    """ Specialist model serializer """
    user = UserModelSerializer(read_only=True)

    class Meta:
        model = Specialist
        exclude = ['created', 'modified']


class AssistantDisplayModelSerializer(serializers.ModelSerializer):
    """ Assistant model serializer """
    user = UserModelSerializer(read_only=True)

    class Meta:
        model = Assistant
        exclude = ['created', 'modified']


class SecretaryDisplayModelSerializer(serializers.ModelSerializer):
    """ Secreatary model serializer """
    user = UserModelSerializer(read_only=True)

    class Meta:
        model = Secretary
        exclude = ['created', 'modified']


class AppointmentModelSerializer(serializers.ModelSerializer):
    """ Appointment Model Serializer """
    specialist = SpecialistDisplayModelSerializer(read_only=True)
    patient = PatientModelSerializer(read_only=True)
    secretary = SecretaryDisplayModelSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'date',
            'specialist',
            'patient',
            'secretary',
        ]
        read_only_fields = ['secretary']


class AppointmentCreateModelSerializer(serializers.Serializer):
    """ Appointment Model Serializer """
    paid = serializers.BooleanField()
    date = serializers.DateTimeField()
    specialist = serializers.PrimaryKeyRelatedField(
        queryset=Specialist.objects.all())
    patient = serializers.PrimaryKeyRelatedField(
        queryset=Patient.objects.all())

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
        isPaid = validated_data['paid']
        validated_data.pop('paid')
        secretary = Secretary.objects.get(user=user)
        validated_data['secretary'] = secretary
        print(validated_data)
        appointment = Appointment.objects.create(**validated_data)
        if isPaid:
            voucher = "PAID"
        else:
            voucher = "PENDING"
        Record.objects.create(appointment=appointment, vouche_state=voucher)
        return appointment


class AppointmentUpdateModelSerializer(serializers.ModelSerializer):
    """ Update appointment """
    class Meta:
        model = Appointment
        fields = ['date', 'specialist']
    
