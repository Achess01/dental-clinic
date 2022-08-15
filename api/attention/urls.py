""" Attention urls """

# Django
from django.urls import path, include

# Django REST framework
from rest_framework.routers import DefaultRouter

# views
from .views import (
    PatientViewSet,
    DiagnosticViewSet,
    TreatmentViewSet,
    TreatmentPerformedViewSet,
    AppointmentViewSet
)

router = DefaultRouter()
router.register('patients', PatientViewSet, basename='patient')
router.register('diagnostics', DiagnosticViewSet, basename='diagnostic')
router.register('treatments', TreatmentViewSet, basename='treatment')
router.register('treatments-performed', TreatmentPerformedViewSet, basename='treatment-performed')
router.register('appointments', AppointmentViewSet, basename='appointment')


urlpatterns = [
    path('', include(router.urls))
]
