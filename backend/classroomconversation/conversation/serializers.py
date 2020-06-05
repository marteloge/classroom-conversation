from rest_framework import serializers

from .models import Conversation


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = [
            "name",
            "description",
            "json",
            "document",
            "created",
            "updated",
            "uuid",
        ]
