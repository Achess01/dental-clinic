""" Patient models """

# Django
from django.db import models
from django.core.validators import RegexValidator

# Utils
from utils.models import ClinicModel


class Patient(ClinicModel):
    """ Patien model """
    rut_regex = RegexValidator(
        regex=r'\w{9,13}$',
        message="Rut must be atleast 9 characters and up to 13 characters."
    )

    rut = models.CharField(
        validators=[rut_regex],
        max_length=13,
        unique=True,
        error_messages={
            "unique": "Patient rut must be unique"
        }
    )
    first_name = models.CharField('first name', max_length=150)
    last_name = models.CharField('last name', max_length=150)
    birthday = models.DateField('patient birthday')
    age = models.PositiveSmallIntegerField('patient age')
    ocuppation = models.CharField(
        'patient occupation',
        max_length=255,
        help_text='What is the ocuppation of the patient'
    )
    address = models.CharField('patient address', max_length=255)
    medical_history = models.CharField(
        'patient medical history',
        max_length=255,
        help_text='It describes what some important medical history of the patient',
        blank=True
    )

    is_active = models.BooleanField(
        default=True,
        help_text='Wheter is active patient or was deleted (active=False)'
    )

    def __str__(self) -> str:
        return f'{self.rut} {self.first_name} {self.last_name}'
