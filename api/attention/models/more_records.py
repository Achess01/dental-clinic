""" Models for late and no attended appointments """

# Models
from .records import Record


class NoAttendedRecord(Record):
    """ No Attended Record model 
        For storing no attended appointments
    """
    pass


class LateRecord(Record):
    """ Late model 
        For storing late appointments
    """
    pass
