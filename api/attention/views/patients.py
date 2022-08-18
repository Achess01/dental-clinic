""" Patients views """

# Django REST Framework
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Model
from attention.models import Patient

# Serializers
from attention.serializers import (
    PatientModelSerializer, PatientUpdateModelSerializer
)

# Permissions
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsClinicStaff, IsClinicAdmin
from attention.permissions import (
    IsAssistant,
    IsSecretary,
    IsSpecialist,
)

# Filters
from rest_framework import filters

class PatientViewSet(viewsets.ModelViewSet):
    """ 
        A view set for view Patients
    """
    queryset = Patient.objects.filter(is_active=True)
    lookup_field = 'rut'
    filter_backends = [filters.SearchFilter]
    search_fields = ['rut', 'first_name', 'last_name']

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['retrieve', 'list']:
            permissions += [IsClinicStaff]

        elif self.action in ['update', 'partial_update', 'destroy']:
            permissions += [IsClinicAdmin]

        elif self.action in ['create']:
            permissions += [IsSecretary]

        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return PatientUpdateModelSerializer

        return PatientModelSerializer

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
