""" Model for appointments """

# Django
from tkinter import CASCADE
from django.db import models

# Utils
from utils.models import ClinicModel


class Appointment(ClinicModel):
    """ Appointment model 
        It stores data about a medical appointment 
        for a patient with a specialist
    """
    date = models.DateTimeField('appointment day and time')
    specialist = models.ForeignKey(
        'users.Specialist',
        help_text='Specialist who attends the patient',
        on_delete=models.CASCADE
    )
    patient = models.ForeignKey(
        'attention.Patient',
        help_text='Patient who is asking for an appointment',
        on_delete=models.CASCADE
    )
    secretary = models.ForeignKey(
        'users.Secretary',
        help_text='Secretary who is setting the appointment',
        null=True,
        on_delete=models.SET_NULL
    )

    def __str__(self) -> str:
        return f'{self.date} Patient: {self.patient} Specialist: {self.specialist}'
