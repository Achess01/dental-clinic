""" User serializers """

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

# Models
from users.models import (
    User,
    Secretary,
    Assistant,
    Specialist
)

# Utils
from utils.validators import rut_regex_validator, phone_regex_validator


class UserSignUpModelSerializer(serializers.ModelSerializer):
    """ Serializer for User Sign Up """
    username = serializers.CharField(
        validators=[
            rut_regex_validator(),
            UniqueValidator(queryset=User.objects.all())
        ]
    )

    phone_number = serializers.CharField(
        validators=[phone_regex_validator()], max_length=17, blank=True)

    class Meta:
        model = User
        fields = [
            'first_name',
            'second_name',
            'last_name',
            'last_mother_name'
            'username',
            'phone_number'
        ]
