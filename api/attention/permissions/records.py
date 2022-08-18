""" Records permissions """

# Permissions
from rest_framework.permissions import BasePermission


class IsRecordSpecialist(BasePermission):
    """ Check if is the specialist of the record """

    def has_object_permission(self, request, view, obj):

        return request.user == obj.appointment.specialist.user
