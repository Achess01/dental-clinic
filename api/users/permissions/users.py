""" User permissions """

# Permissions
from rest_framework.permissions import BasePermission


class IsSystemAdmin(BasePermission):
    """ Allow access only to system admin """

    def has_permission(self, request, view):
        return request.user.is_admin
