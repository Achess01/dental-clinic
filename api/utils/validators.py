""" Data validators """

# Django
from django.core.validators import RegexValidator


def rut_regex_validator():
    rut_regex = RegexValidator(
        regex=r'[a-zA-Z0-9]{9,13}$',
        message="Rut must be atleast 9 characters and up to 13 characters. Only letters and digits allowed"
    )
    return rut_regex


def phone_regex_validator():
    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: +99999999. Up to 15 digits allowed."
    )
    return phone_regex