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
    queryset = Record.objects.all()
    serializer_class = RecordModelSerializer


class NoAttendedRecordViewSet(
    mixins.RetrieveModelMixin,    
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """ Record viewset """
    queryset = NoAttendedRecord.objects.all()
    serializer_class = NoAttendedRecordModelSerializer


class LateRecordViewSet(
    mixins.RetrieveModelMixin,    
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """ Record viewset """
    queryset = LateRecord.objects.all()
    serializer_class = LateRecordModelSerializer