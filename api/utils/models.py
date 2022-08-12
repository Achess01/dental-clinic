""" Django models utilities """

# Django
from django.db import models


class ClinicModel(models.Model):
    """  
        Clinic base model
        Abstract class that is base for clinic models in project.
        Provides every table with the following attributes
            + created (DateTime): Datetime the object was created
            + modified (DateTime): Last datetime the objects wa modified            
    """
    created = models.DateTimeField('created at', auto_now_add=True)
    modified = models.DateTimeField('modified at', auto_now=True)

    class Meta:
        abstract = True
        get_latest_by = 'created'
        ordering = ['-created', '-modified']
