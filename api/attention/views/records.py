""" Views for Records """

# Django REST Framework
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

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

# Permissions
from rest_framework.permissions import IsAuthenticated
from attention.permissions import IsSpecialist, IsRecordSpecialist
from users.permissions import IsClinicStaff

# Filters
from django_filters.rest_framework import DjangoFilterBackend
from attention.filters import RecordFilterSet


class RecordViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """ Record viewset """
    queryset = Record.objects.all()
    serializer_class = RecordModelSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = RecordFilterSet

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['update', 'partial_update']:
            permissions += [IsSpecialist, IsRecordSpecialist]
        else:
            permissions += [IsClinicStaff]

        return [p() for p in permissions]

    @action(detail=False, methods=['get'])
    def attention_types(self, request, *args, **kwargs):
        data = {}
        values = Record.ATTENTION_TYPES
        for value in values:
            data[value[0]] = value[1]
        return Response(data)

    @action(detail=False, methods=['get'])
    def attendance_states(self, request, *args, **kwargs):
        data = {}
        values = Record.ATTENDANCE_STATES
        for value in values:
            data[value[0]] = value[1]
        return Response(data)

    @action(detail=False, methods=['get'])
    def voucher_states(self, request, *args, **kwargs):
        data = {}
        values = Record.VOUCHER_STATES
        for value in values:
            data[value[0]] = value[1]
        return Response(data)

    @action(detail=False, methods=['get'])
    def surfaces(self, request, *args, **kwargs):
        data = {}
        values = Record.SURFACES
        for value in values:
            data[value[0]] = value[1]
        return Response(data)


class NoAttendedRecordViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """ Record viewset """
    queryset = NoAttendedRecord.objects.all()
    serializer_class = NoAttendedRecordModelSerializer
    permission_classes = [IsAuthenticated, IsClinicStaff]


class LateRecordViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """ Record viewset """
    queryset = LateRecord.objects.all()
    serializer_class = LateRecordModelSerializer
    permission_classes = [IsAuthenticated, IsClinicStaff]
