from django import forms
from django.utils.translation import gettext_lazy as _

from .models import Conversation


class ConversationForm(forms.ModelForm):
    class Meta:
        model = Conversation
        fields = ("name", "description", "document", "uniform_probability")
        labels = {
            "name": _("form.label.name"),
            "description": _("form.label.description"),
            "document": _("form.label.document"),
            "uniform_probability": _("form.label.uniform_probability"),
        }
