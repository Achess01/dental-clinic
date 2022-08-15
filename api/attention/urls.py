""" Attention urls """

# Django
from django.urls import path, include

# Django REST framework
from rest_framework.routers import DefaultRouter

# views
from .views import PatientViewSet

router = DefaultRouter()
router.register('patients', PatientViewSet, basename='patient')


urlpatterns = [
    path('', include(router.urls))
]
