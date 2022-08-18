""" Records serializers """

# Django REST Framework
from rest_framework import serializers

# Models
from attention.models import (
    Record,
    LateRecord,
    NoAttendedRecord
)

# Serializers
from attention.serializers import AppointmentModelSerializer


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


class NoAttendedRecordModelSerializer(RecordModelSerializer):
    class Meta(RecordModelSerializer.Meta):
        model = NoAttendedRecord


class LateRecordModelSerializer(RecordModelSerializer):
    class Meta(RecordModelSerializer.Meta):
        model = LateRecord
