""" Appointment views """

# Django
from django.utils import timezone

# Django REST Framework
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response

# Models
from attention.models import Appointment

# Serializers
from attention.serializers import (
    AppointmentModelSerializer,
    AppointmentUpdateModelSerializer,
    AppointmentCreateModelSerializer,
)

# Permissions
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsClinicStaff

from attention.permissions import (
    IsAssistant,
    IsSecretary,
    IsSpecialist
)


# Filtering
from django_filters.rest_framework import DjangoFilterBackend
from attention.filters import AppointmentFilterSet
from rest_framework import filters


""" Views """


class AppointmentViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """ Appointment View Set """
    queryset = Appointment.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = AppointmentFilterSet
    ordering = ['date']

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['retrieve', 'list']:
            permissions += [IsClinicStaff]

        elif self.action in ['update', 'partial_update', 'create']:
            permissions += [IsSecretary]

        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return AppointmentUpdateModelSerializer
        if self.action == 'create':
            return AppointmentCreateModelSerializer

        return AppointmentModelSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        appointment = AppointmentModelSerializer(data).data
        headers = self.get_success_headers(appointment)
        return Response(appointment, status=status.HTTP_201_CREATED, headers=headers)
