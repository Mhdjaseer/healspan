from django.contrib import admin
from .models import Choice,Vote,Question

# Register your models here.
admin.site.register(Choice)
admin.site.register(Vote)
admin.site.register(Question)