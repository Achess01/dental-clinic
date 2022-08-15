""" Users model for clinic app """

# Django
from django.contrib.auth.models import AbstractUser
from django.db import models


# Utils
from utils.models import ClinicModel
from utils.validators import rut_regex_validator, phone_regex_validator


class User(ClinicModel, AbstractUser):
    """ User model 
        Extends from AbstractUser, change username field to 
        email and add bolean fields for role validation
    """
    username = models.CharField(
        validators=[rut_regex_validator()], max_length=13, unique=True,
        error_messages={
            "unique": "A user with that username already exists.",
        },
        help_text="Must be a valid rut"
    )

    phone_number = models.CharField(
        validators=[phone_regex_validator()], max_length=17, blank=True)

    first_name = models.CharField(
        'first name',
        max_length=150
    )

    second_name = models.CharField(
        'second name',
        max_length=150,
        blank=True
    )

    last_name = models.CharField(
        'last name',
        max_length=150
    )

    last_mother_name = models.CharField(
        'last mother name',
        max_length=150,
        blank=True
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['phone_number', 'first_name', 'last_name']

    is_admin = models.BooleanField('admin status', default=False)
    is_secretary = models.BooleanField('secretary status', default=False)
    is_specialist = models.BooleanField('specialist status', default=False)
    is_assistant = models.BooleanField('assistant status', default=False)

    is_new_user = models.BooleanField(
        'new user status',
        default=True,
        help_text='New users has to change default password'
    )

    def __str__(self) -> str:
        return f'{self.username} {self.first_name} {self.last_name}'
