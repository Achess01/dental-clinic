""" User permissions """

# Permissions
from rest_framework.permissions import BasePermission


class IsClinicAdmin(BasePermission):
    """ Allow access only to clinic admin """

    def has_permission(self, request, view):
        return request.user.is_admin


class IsClinicStaff(BasePermission):
    """ Allow access to clinic staff """

    def has_permission(self, request, view):
        user = request.user
        return bool(
            user.is_admin or
            user.is_specialist or
            user.is_secretary or
            user.is_assistant
        )
