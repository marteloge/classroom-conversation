from django.db import models
from django.db.models import JSONField


class Conversation(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.CharField(max_length=36, blank=False, unique=True)
    name = models.CharField(max_length=200, blank=False)
    description = models.TextField(max_length=2000, blank=False)
    json = JSONField(blank=True)
    document = models.FileField(upload_to="documents/", blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    uniform_probability = models.BooleanField(default=True)

    ## TODO: will json be reloaded on update?

    def __str__(self):
        return str(self.name)
