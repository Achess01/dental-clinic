""" Diagnostic, Treatment and TreatmentPerformed views """

# Django REST Framework
from rest_framework import viewsets

# Models
from attention.models import (
    Diagnostic,
    Treatment,
    TreatmentPerformed,
)

# Serializers
from attention.serializers import (
    DiagnosticModelSerializer,
    TreatmentModelSerializer,
    TreatmentPerformedModelSerializer
)

# Permissions
from rest_framework.permissions import IsAuthenticated

from users.permissions import IsClinicStaff, IsClinicAdmin


class DiagnosticViewSet(viewsets.ModelViewSet):
    """ 
        Views for Diagnostics
    """
    queryset = Diagnostic.objects.all()
    serializer_class = DiagnosticModelSerializer

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['retrieve', 'list']:
            permissions += [IsClinicStaff]
        else:
            permissions += [IsClinicAdmin]
        return [p() for p in permissions]


class TreatmentViewSet(viewsets.ModelViewSet):
    """ 
        Views for Treatments
    """
    queryset = Treatment.objects.all()
    serializer_class = TreatmentModelSerializer

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['retrieve', 'list']:
            permissions += [IsClinicStaff]
        else:
            permissions += [IsClinicAdmin]
        return [p() for p in permissions]


class TreatmentPerformedViewSet(viewsets.ModelViewSet):
    """ 
        Views for TreatmentPerformeds
    """
    queryset = TreatmentPerformed.objects.all()
    serializer_class = TreatmentPerformedModelSerializer


    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['retrieve', 'list']:
            permissions += [IsClinicStaff]
        else:
            permissions += [IsClinicAdmin]
        return [p() for p in permissions]
