""" Records serializers """

# Django
from django.utils import timezone

# Django REST Framework
from rest_framework import serializers
from attention.filters import appointments

# Models
from attention.models import (
    Record,
    LateRecord,
    NoAttendedRecord
)
from ..models.appointments import Appointment

# Serializers
from attention.serializers import AppointmentModelSerializer
from .diagnostics import (
    DiagnosticModelSerializer,
    TreatmentModelSerializer,
    TreatmentPerformedModelSerializer
)
from .appointments import AppointmentModelSerializer


class RecordCreateModelSerializer(serializers.ModelSerializer):
    """ Record create model serializer """

    class Meta:
        model = Record
        fields = '__all__'


class RecordRetrieveModelSerializer(serializers.ModelSerializer):
    """ List record """
    diagnostic = DiagnosticModelSerializer(read_only=True)
    treatment = TreatmentModelSerializer(read_only=True)
    tretment_performed = TreatmentPerformedModelSerializer(read_only=True)
    appointment = AppointmentModelSerializer(read_only=True)

    class Meta:
        model = Record
        exclude = ['created', 'modified']
        read_only_fields = [
            'appointment',
            'diagnostic_date'
            'diagnostic',
            'treatment',
            'tretment_performed',
            'id'
        ]


class RecordModelSerializer(serializers.ModelSerializer):
    """ Record model serializer """
    appointment = AppointmentModelSerializer(read_only=True)

    class Meta:
        model = Record
        exclude = ['created', 'modified']
        read_only_fields = [
            'appointment',
            'diagnostic_date'
        ]

    def update(self, instance, validated_data):
        attendance_state = 'attendance_state'
        diagnostic = 'diagnostic'
        if attendance_state in validated_data and instance.attendance_state == '':
            fields = RecordCreateModelSerializer(instance).data
            fields['appointment'] = instance.appointment
            if validated_data[attendance_state] == 'L' and not self.is_saved(instance.pk, LateRecord):
                LateRecord.objects.create(**fields)
            elif validated_data[attendance_state] == 'N' and not self.is_saved(instance.pk, NoAttendedRecord):
                NoAttendedRecord.objects.create(**fields)

        if diagnostic in validated_data:
            instance.diagnostic_date = timezone.now()

        return super().update(instance, validated_data)

    def is_saved(self, pk, model):
        return model.objects.filter(pk=pk).exists()


class NoAttendedRecordModelSerializer(RecordModelSerializer):
    class Meta(RecordModelSerializer.Meta):
        model = NoAttendedRecord


class LateRecordModelSerializer(RecordModelSerializer):
    class Meta(RecordModelSerializer.Meta):
        model = LateRecord
