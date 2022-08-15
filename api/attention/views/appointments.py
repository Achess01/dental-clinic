""" Appointment views """

# Django REST Framework
from rest_framework import viewsets

# Models
from attention.models import Appointment

# Serializers
from attention.serializers import AppointmentModelSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    """ Appointment View Set """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentModelSerializer
    