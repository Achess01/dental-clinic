from django.contrib import admin

# Models
from .models import (
    Appointment,
    Diagnostic,
    Treatment,
    TreatmentPerformed,
    Patient,
    Record,
    NoAttendedRecord,
    LateRecord
)

admin.site.register(Appointment)
admin.site.register(Diagnostic)
admin.site.register(Treatment)
admin.site.register(TreatmentPerformed)
admin.site.register(Patient)
admin.site.register(Record)
admin.site.register(NoAttendedRecord)
admin.site.register(LateRecord)
