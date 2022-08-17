""" User serializers """

# Python
import string
import secrets

# Django
from django.contrib.auth import password_validation, authenticate

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

# Serializers
from .profiles import SpecialistModelSerializer, AssistantModelSerializer

# Utils
from utils.validators import rut_regex_validator, phone_regex_validator


class InitialPasswordSerializer(serializers.Serializer):
    """ Initial password serializer """
    username = serializers.CharField(
        validators=[rut_regex_validator()]
    )
    old_password = serializers.CharField(min_length=5, max_length=64)
    password = serializers.CharField(min_length=5, max_length=64)
    password_confirmation = serializers.CharField(min_length=5, max_length=64)

    def validate(self, data):
        """ Check credentials and if user changed given password """
        user = authenticate(
            username=data['username'],
            password=data['old_password']
        )
        passwd = data['password']
        passwd_conf = data['password_confirmation']

        if not user:
            raise serializers.ValidationError('Invalid credentials')
        if not user.is_new_user:
            raise serializers.ValidationError(
                'You have already changed you initial password')

        if passwd != passwd_conf:
            raise serializers.ValidationError(
                'Password and password confirmation don\'t match'
            )

        password_validation.validate_password(passwd)

        self.context['user'] = user
        return data

    def create(self, data):
        """ Change password"""
        user = self.context['user']
        user.set_password(data['password'])
        user.is_new_user = False
        user.save()
        return {"message": "Password changed!"}


class UserSignUpModelSerializer(serializers.ModelSerializer):
    """ Serializer for User Sign Up """
    username = serializers.CharField(
        validators=[
            rut_regex_validator(),
            UniqueValidator(queryset=User.objects.all())
        ]
    )

    phone_number = serializers.CharField(
        validators=[phone_regex_validator()], max_length=17)

    class Meta:
        model = User
        fields = [
            'first_name',
            'second_name',
            'last_name',
            'last_mother_name',
            'username',
            'phone_number',
            'is_admin',
            'is_secretary',
            'is_assistant',
            'is_specialist',
        ]

    def create(self, validated_data):
        password = self.generate_user_password()
        self.context['raw_password'] = password
        validated_data['password'] = password
        validated_data['is_new_user'] = True
        user = User.objects.create_user(**validated_data)
        return user

    def generate_user_password(self):
        """ Generate random password for user """
        alphabet = string.ascii_letters + string.digits
        password = ''.join(secrets.choice(alphabet) for i in range(8))
        return password


class UserLoginSerializer(serializers.Serializer):
    """ User login model serializer """
    username = serializers.CharField(
        validators=[rut_regex_validator()]
    )
    password = serializers.CharField(min_length=5, max_length=64)

    def validate(self, data):
        """ Check credentials and if user changed given password """
        user = authenticate(
            username=data['username'],
            password=data['password']
        )
        if not user:
            raise serializers.ValidationError('Invalid credentials')
        if user.is_new_user:
            raise serializers.ValidationError('You must change your password')

        self.context['user'] = user
        return data

    def create(self, validated_data):
        token, created = Token.objects.get_or_create(user=self.context['user'])        
        return self.context['user'], token.key


class AdminSignUpSerializer(UserSignUpModelSerializer):
    """ Admin sign up serializer """
    class Meta(UserSignUpModelSerializer.Meta):
        pass

    def create(self, validated_data):
        validated_data['is_admin'] = True
        return super().create(validated_data)


class SpecialistSignUpSerializer(UserSignUpModelSerializer):
    """ Specialist sign up serializer """
    speciality = serializers.CharField(
        max_length=150
    )

    class Meta(UserSignUpModelSerializer.Meta):
        fields = UserSignUpModelSerializer.Meta.fields + ['speciality']

    def create(self, validated_data):
        speciality = validated_data['speciality']
        validated_data.pop('speciality')
        validated_data['is_specialist'] = True
        instance = super().create(validated_data)
        Specialist.objects.create(user=instance, speciality=speciality)
        return instance


class AssistantSignUpSerializer(UserSignUpModelSerializer):
    """ Assistant sign up serializer """
    specialist = serializers.PrimaryKeyRelatedField(
        queryset=Specialist.objects.all())

    class Meta(UserSignUpModelSerializer.Meta):
        fields = UserSignUpModelSerializer.Meta.fields + ['specialist']

    def create(self, validated_data):
        specialist = validated_data['specialist']
        validated_data.pop('specialist')
        validated_data['is_assistant'] = True
        instance = super().create(validated_data)
        Assistant.objects.create(user=instance, specialist=specialist)
        return instance


class SecretarySignUpSerializer(UserSignUpModelSerializer):
    """ Secretary sign up serializer """
    class Meta(UserSignUpModelSerializer.Meta):
        pass

    def create(self, validated_data):
        validated_data['is_secretary'] = True
        instance = super().create(validated_data)
        Secretary.objects.create(user=instance)
        return instance


class UserModelSerializer(serializers.ModelSerializer):
    """ User model serializer """
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'second_name',
            'last_name',
            'last_mother_name',
            'username',
            'phone_number',
            'is_admin',
            'is_secretary',
            'is_assistant',
            'is_specialist',
        ]


class UserSecretaryModelSerializer(UserModelSerializer):
    """ User secialist model serializer """
    class Meta(UserModelSerializer.Meta):
        pass


class UserSpecialistModelSerializer(UserModelSerializer):
    """ User specialist model serializer """
    profile = SpecialistModelSerializer(
        read_only=True, source="specialist_user")

    class Meta(UserModelSerializer.Meta):
        fields = UserModelSerializer.Meta.fields + ['profile']


class UserAssistantModelSerializer(UserModelSerializer):
    """ User specialist model serializer """
    profile = AssistantModelSerializer(read_only=True, source="assistant_user")

    class Meta(UserModelSerializer.Meta):
        fields = UserModelSerializer.Meta.fields + ['profile']
