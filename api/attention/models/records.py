""" Models for patient medical records """

# Django
from django.db import models

# Utils
from utils.models import ClinicModel


class Record(ClinicModel):
    """ Record model 
        It saves information about specialist diagnosticas,
        treatments, indicationts... For the patient.
    """
    ATTENTION_TYPES = (
        ('U', 'URGENT'),
        ('T', 'TREATMENT')
    )

    ATTENDANCE_STATES = (
        ('A', 'ATTENDED'),
        ('N', 'NO ATTENDED'),
        ('L', 'LATE')
    )

    VOUCHER_STATES = (
        ('PAID', 'PAID'),
        ('PENDING', 'PENDING')
    )

    SURFACES = (
        ('M', 'M'),
        ('O', 'O'),
        ('D', 'D')
    )

    diagnostic_date = models.DateTimeField(
        'diagnostic datetime',
        null=True
    )

    attention_type = models.CharField(
        'attention type',
        max_length=1,
        blank=True,
        choices=ATTENTION_TYPES,
    )

    treated_piece = models.CharField(
        'treated piece',
        max_length=255,
        blank=True
    )

    diagnostic = models.ForeignKey(
        'attention.Diagnostic',
        null=True,
        on_delete=models.SET_NULL
    )

    treatment = models.ForeignKey(
        'attention.Treatment',
        null=True,
        on_delete=models.SET_NULL
    )

    actual_appointment_date = models.DateTimeField(
        'appointment datetime',
        null=True
    )
    indications = models.CharField(
        max_length=255,
        help_text='specialist indications',
        blank=True
    )

    notes = models.CharField(
        max_length=255,
        help_text='specialist notes',
        blank=True
    )

    attendance_state = models.CharField(
        max_length=1,
        blank=True,
        choices=ATTENDANCE_STATES
    )

    vouche_state = models.CharField(
        max_length=10,
        blank=True,
        choices=VOUCHER_STATES
    )

    surface = models.CharField(
        max_length=1,
        blank=True,
        choices=SURFACES
    )

    patient = models.ForeignKey(
        'attention.Patient',
        on_delete=models.CASCADE
    )

    specialist = models.ForeignKey(
        'users.Specialist',
        null=True,
        on_delete=models.SET_NULL
    )

    tretment_performed = models.ForeignKey(
        'attention.TreatmentPerformed',
        null=True,
        on_delete=models.SET_NULL
    )

    def __str__(self) -> str:
        return f'Patient: {self.patient} Specialist: {self.specialist}'
