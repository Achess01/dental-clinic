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


class DiagnosticViewSet(viewsets.ModelViewSet):
    """ 
        Views for Diagnostics
    """
    queryset = Diagnostic.objects.all()
    serializer_class = DiagnosticModelSerializer


class TreatmentViewSet(viewsets.ModelViewSet):
    """ 
        Views for Treatments
    """
    queryset = Treatment.objects.all()
    serializer_class = TreatmentModelSerializer


class TreatmentPerformedViewSet(viewsets.ModelViewSet):
    """ 
        Views for TreatmentPerformeds
    """
    queryset = TreatmentPerformed.objects.all()
    serializer_class = TreatmentPerformedModelSerializer
