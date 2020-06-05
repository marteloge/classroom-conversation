from django.contrib import admin

# Register your models here.

from .models import Conversation

admin.site.register(Conversation)
