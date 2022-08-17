""" Patiens permissions """

# Permissions

from urllib import request
from rest_framework.permissions import BasePermission


class IsSecretary(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_secretary


class IsAssistant(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_assistant


class IsSpecialist(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_specialist
