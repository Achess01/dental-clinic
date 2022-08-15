""" Models for patient record """

# Django
from django.db import models

# Utils
from utils.models import ClinicModel


class BaseOptionModel(ClinicModel):
    """ Base Option Model 
        It helps to the admin to insert custom options 
        for save in patient records
    """
    name = models.CharField('name', max_length=150)
    description = models.CharField('description', max_length=255)

    def __str__(self) -> str:
        return f'{self.name}: {self.description}'

    class Meta:
        abstract = True


class Treatment(BaseOptionModel):
    """ Treatment model
        It describes the treatment
    """
    pass


class TreatmentPerformed(BaseOptionModel):
    """ Treatment performed model
        It describes the treatment that was performed
    """
    pass


class Diagnostic(BaseOptionModel):
    """ Diagnostic model 
        It describes the diagnostic
    """
    pass
