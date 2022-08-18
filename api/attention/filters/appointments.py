""" Appointments filters """

# Filters
from django_filters import rest_framework as filters

# Models
from attention.models import Appointment

class AppointmentFilterSet(filters.FilterSet):
    start = filters.DateTimeFilter(field_name='date', lookup_expr='gte')
    end = filters.DateTimeFilter(field_name='date', lookup_expr='lte')

    class Meta:
        model = Appointment
        fields = ['specialist', 'patient', 'secretary']
