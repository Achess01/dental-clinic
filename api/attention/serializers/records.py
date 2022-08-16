""" Records serializers """

# Django REST Framework
from rest_framework import serializers

# Models
from attention.models import (
    Record,
    LateRecord,
    NoAttendedRecord
)


class RecordModelSerializer(serializers.ModelSerializer):
    """ Record model serializer """
    class Meta:
        model = Record,
        fields = '__all__'
        read_only_fields = [
            'patient',
            'specialist',
            'diagnostic_date'            
        ]


class NoAttendedRecordModelSerializer(RecordModelSerializer):
    class Meta(RecordModelSerializer.Meta):
        model = NoAttendedRecord


class LateRecordModelSerializer(RecordModelSerializer):
    class Meta(RecordModelSerializer.Meta):
        model = LateRecord