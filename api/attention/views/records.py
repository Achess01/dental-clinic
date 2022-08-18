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

# Permissions
from rest_framework.permissions import IsAuthenticated
from attention.permissions import IsSpecialist, IsRecordSpecialist
from users.permissions import IsClinicStaff


class RecordViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """ Record viewset """
    queryset = Record.objects.all()
    serializer_class = RecordModelSerializer

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['update', 'partial_update']:
            permissions += [IsSpecialist, IsRecordSpecialist]
        else:
            permissions += [IsClinicStaff]

        return [p() for p in permissions]


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
