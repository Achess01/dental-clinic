""" Profiles model for users """

# Django
from django.db import models

# Utils
from utils.models import ClinicModel


class Specialist(ClinicModel):
    """ Model specialist """
    user = models.OneToOneField(
        'users.User', on_delete=models.CASCADE, related_name='specialist_user')
    speciality = models.CharField(
        'speciality for Specialist user', max_length=150)


class Assistant(ClinicModel):
    """ Model Assistant """
    user = models.OneToOneField(
        'users.User', on_delete=models.CASCADE, related_name='assistant_user')
    specialist = models.ForeignKey(
        Specialist, related_name='specialist', null=True, on_delete=models.SET_NULL)


class Secretary(ClinicModel):
    """ Model Secretary """
    user = models.OneToOneField(
        'users.User', on_delete=models.CASCADE, related_name='secretary_user')    
