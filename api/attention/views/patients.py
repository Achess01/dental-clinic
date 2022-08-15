""" Patients views """

# Django REST Framework
from rest_framework import viewsets

# Model
from attention.models import Patient

# Serializers
from attention.serializers import PatientModelSerializer


class PatientViewSet(viewsets.ModelViewSet):
    """ 
        A view set for view Patients
    """
    queryset = Patient.objects.filter(is_active=True)
    serializer_class = PatientModelSerializer
    lookup_field = 'rut'


    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

