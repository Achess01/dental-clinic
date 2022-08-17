""" Appointment views """

# Django REST Framework
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response

# Models
from attention.models import Appointment

# Serializers
from attention.serializers import (
    AppointmentModelSerializer,
    AppointmentUpdateModelSerializer,
)

# Permissions
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsClinicStaff

from attention.permissions import (
    IsAssistant,
    IsSecretary,
    IsSpecialist
)


class AppointmentViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    """ Appointment View Set """
    queryset = Appointment.objects.all()

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

        return AppointmentModelSerializer
    
    
