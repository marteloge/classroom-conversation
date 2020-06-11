import uuid

from rest_framework.permissions import AllowAny
from rest_framework import viewsets

from django.shortcuts import render, redirect
from django.core.files import File

from django.contrib.auth.decorators import login_required, permission_required

from .forms import ConversationForm
from .models import Conversation
from .serializers import ConversationSerializer
from .parser import graphml_to_json


### API ###
class ConversationDetailAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [AllowAny]
    lookup_field = "uuid"


### VIEWS ###
@login_required(login_url="/account/login/")
@permission_required("user.is_staff", raise_exception=True)
def upload_document(request):
    if request.method == "POST":
        form = ConversationForm(request.POST, request.FILES)

        if form.is_valid():
            conversation = form.save(commit=False)
            conversation.uuid = str(uuid.uuid4())
            conversation.json = graphml_to_json(
                File(conversation.document), conversation.uniform_probability
            )
            conversation.save()
            return redirect("document_list")
        else:
            return render(request, "upload_document.html", {"form": form})

    form = ConversationForm()
    return render(request, "upload_document.html", {"form": form})


@login_required(login_url="/account/login/")
@permission_required("user.is_staff", raise_exception=True)
def document_list(request):
    conversations = Conversation.objects.all().order_by("-created")
    return render(request, "document_list.html", {"conversations": conversations})
