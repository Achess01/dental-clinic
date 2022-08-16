""" Views for Records """

# Django REST Framework
from rest_framework import viewsets, mixins

# Serializers
from attention.serializers import (
    RecordModelSerializer,
    NoAttendedRecordModelSerializer,
    LateRecordModelSerializer
)

# Models
from attention.models import (
    Record,
    NoAttendedRecord,
    LateRecord
)


class RecordViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """ Record viewset """
    serializer_class = RecordModelSerializer
    queryset = Record.objects.all()


class NoAttendedRecordViewSet(
    mixins.RetrieveModelMixin,    
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """ Record viewset """
    serializer_class = NoAttendedRecordModelSerializer
    queryset = NoAttendedRecord.objects.all()


class LateRecordViewSet(
    mixins.RetrieveModelMixin,    
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """ Record viewset """
    serializer_class = LateRecordModelSerializer
    queryset = LateRecord.objects.all()