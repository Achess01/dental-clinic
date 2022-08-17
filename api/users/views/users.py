""" Users views """

# Django REST Framework
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

# Permissions
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
)

from users.permissions import IsSystemAdmin


# Models
from users.models import (
    User,
    Secretary,
    Assistant,
    Specialist
)

# Serializers
from users.serializers import (
    UserLoginSerializer,
    UserModelSerializer,
    UserAssistantModelSerializer,
    UserSpecialistModelSerializer,
    UserSecretaryModelSerializer,
    SecretarySignUpSerializer,
    AssistantSignUpSerializer,
    SpecialistSignUpSerializer,
    AdminSignUpSerializer,
    InitialPasswordSerializer,
)
from ..serializers.users import ChangeUserPasswordSerializer


class UserViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'username'

    def get_permissions(self):
        """ Assign permissions based on action """
        print(self.action)
        permissions = []
        if self.action in ['admin', 'reset_password']:
            permissions += [IsAuthenticated, IsAdminUser]
        elif self.action in [
            'specialists', 'assistants',
            'secretaries',
            'update', 'partial_update'
        ]:
            permissions += [IsAuthenticated, IsSystemAdmin]
        elif self.action == 'retrieve':
            permissions += [IsAuthenticated, IsSystemAdmin]

        return [p() for p in permissions]

    @action(detail=False, methods=['post'], url_path="clinic-admin/signup")
    def admin(self, request):
        """ Admin signup """
        serializer = AdminSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        admin = serializer.save()
        data = UserModelSerializer(admin).data
        return Response({"username": admin.username, "passowrd": serializer.context['raw_password']}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], url_path="specialists/signup")
    def specialists(self, request):
        """ Specialist signup """
        serializer = SpecialistSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        admin = serializer.save()
        data = UserSpecialistModelSerializer(admin).data
        return Response({"username": admin.username, "passowrd": serializer.context['raw_password']}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], url_path="assistants/signup")
    def assistants(self, request):
        """ Assistant signup """
        serializer = AssistantSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        admin = serializer.save()
        data = UserAssistantModelSerializer(admin).data
        return Response({"username": admin.username, "passowrd": serializer.context['raw_password']}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], url_path="secretaries/signup")
    def secretaries(self, request):
        """ Secretary signup """
        serializer = SecretarySignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        admin = serializer.save()
        return Response({"username": admin.username, "passowrd": serializer.context['raw_password']}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def login(self, request):
        """ User login """
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        if user.is_specialist:
            user_data = UserSpecialistModelSerializer(user).data
        elif user.is_assistant:
            user_data = UserAssistantModelSerializer(user).data
        else:
            user_data = UserModelSerializer(user).data

        data = {
            'user': user_data,
            'token': token
        }
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def initial_password(self, request):
        """ Password change for new users """
        serializer = InitialPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        return Response(data, status=status.HTTP_202_ACCEPTED)

    @action(detail=True, methods=['post'])
    def reset_password(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = ChangeUserPasswordSerializer(data=request.data)
        serializer.context['request'] = request
        serializer.context['user'] = user
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        return Response(data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        if instance.is_specialist:
            serializer = UserSpecialistModelSerializer(instance)
        if instance.is_assistant:
            serializer = UserAssistantModelSerializer(instance)

        return Response(serializer.data)
