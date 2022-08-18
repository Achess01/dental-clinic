""" Records filters """

# Filters
from django_filters import rest_framework as filters

# Models
from attention.models import Record

class RecordFilterSet(filters.FilterSet):
    start = filters.DateTimeFilter(field_name='appointment__date', lookup_expr='gte')
    end = filters.DateTimeFilter(field_name='appointment__date', lookup_expr='lte')    
    patient = filters.NumberFilter(field_name='appointment__patient')

    class Meta:
        model = Record
        fields = ['attendance_state']

