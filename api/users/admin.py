from django.contrib import admin

# Models
from .models import User, Secretary, Specialist, Assistant

# Register your models here.
admin.site.register(User)
admin.site.register(Secretary)
admin.site.register(Specialist)
admin.site.register(Assistant)
