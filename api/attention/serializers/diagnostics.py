""" Diagonstic, Treatment and TreatmentPerformed serializers """

# Django REST Framewor
from rest_framework import serializers

# Models
from attention.models import Diagnostic, Treatment, TreatmentPerformed


class DiagnosticModelSerializer(serializers.ModelSerializer):
    """ Diagnostic Model serializer """
    class Meta:
        model = Diagnostic
        fields = '__all__'


class TreatmentModelSerializer(serializers.ModelSerializer):
    """ Treatment Model serializer """
    class Meta:
        model = Treatment
        fields = '__all__'


class TreatmentPerformedModelSerializer(serializers.ModelSerializer):
    """ TreatmentPerformed Model serializer """
    class Meta:
        model = TreatmentPerformed
        fields = '__all__'
