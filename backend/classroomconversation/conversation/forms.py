from django import forms
from django.utils.translation import gettext_lazy as _
from django.core.files import File

from .models import Conversation
from django.core.exceptions import ValidationError

from .validation import (
    has_one_star_node,
    has_illegal_node_shapes,
    has_octant_node,
    all_nodes_connected,
    diamonds_connected_to_squares,
    broken_conversation,
    missing_edge_probability,
    wrong_probability_distribution,
    one_type_of_child_nodes,
)


class ConversationForm(forms.ModelForm):
    class Meta:
        model = Conversation
        fields = (
            "name",
            "description",
            "document",
            "uniform_probability",
        )
        labels = {
            "name": _("form.label.name"),
            "description": _("form.label.description"),
            "document": _("form.label.document"),
            "uniform_probability": _("form.label.uniform_probability"),
        }

    def clean_document(self):
        document = self.cleaned_data.get("document")
        uniform = self.data.get("uniform_probability")
        file = File(document)

        if not all_nodes_connected(file):
            raise forms.ValidationError(_("validation.doc.all.nodes.connected"))

        if broken_conversation(file):
            raise forms.ValidationError(_("validation.doc.broken.conversation"))

        if not has_one_star_node(file):
            raise forms.ValidationError(_("validation.doc.one.star"))

        if not has_octant_node(file):
            raise forms.ValidationError(_("validation.doc.end.node"))

        if has_illegal_node_shapes(file):
            raise forms.ValidationError(_("validation.doc.illegal.shapes"))

        if not diamonds_connected_to_squares(file):
            raise forms.ValidationError(_("validation.doc.diamonds.connections"))

        if not one_type_of_child_nodes(file):
            raise forms.ValidationError(_("validation.doc.child.nodes.type"))

        if not uniform:
            if missing_edge_probability(file):
                raise forms.ValidationError(_("validation.doc.missing.probability"))

            if wrong_probability_distribution(file):
                raise forms.ValidationError(_("validation.doc.probability.sum"))

        return document
