import uuid
import xml.etree.ElementTree as ElementTree

from rest_framework.permissions import AllowAny
from rest_framework import viewsets

from django.shortcuts import render, redirect
from django.core.files import File

from django.contrib.auth.decorators import login_required, permission_required

from .forms import ConversationForm
from .models import Conversation
from .serializers import ConversationSerializer

# TODO: add graph validation on upload

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

    form = ConversationForm()
    return render(request, "upload_document.html", {"form": form})


@login_required(login_url="/account/login/")
@permission_required("user.is_staff", raise_exception=True)
def document_list(request):
    conversations = Conversation.objects.all().order_by("-created")
    return render(request, "document_list.html", {"conversations": conversations})


#### HELPERS ####


def get_graphml():
    return {
        "graph": "{http://graphml.graphdrawing.org/xmlns}graph",
        "key": "{http://graphml.graphdrawing.org/xmlns}key",
        "node": "{http://graphml.graphdrawing.org/xmlns}node",
        "edge": "{http://graphml.graphdrawing.org/xmlns}edge",
        "data": "{http://graphml.graphdrawing.org/xmlns}data",
        "shapenode": "{http://www.yworks.com/xml/graphml}ShapeNode",
        "geometry": "{http://www.yworks.com/xml/graphml}Geometry",
        "fill": "{http://www.yworks.com/xml/graphml}Fill",
        "boderstyle": "{http://www.yworks.com/xml/graphml}BorderStyle",
        "nodelabel": "{http://www.yworks.com/xml/graphml}NodeLabel",
        "shape": "{http://www.yworks.com/xml/graphml}Shape",
        "polyLine": "{http://www.yworks.com/xml/graphml}PolyLineEdge",
        "arrow": "{http://www.yworks.com/xml/graphml}Arrows",
        "bendStyle": "{http://www.yworks.com/xml/graphml}BendStyle",
        "path": "{http://www.yworks.com/xml/graphml}Path",
        "linestyle": "{http://www.yworks.com/xml/graphml}LineStyle",
        "edgelabel": "{http://www.yworks.com/xml/graphml}EdgeLabel",
    }


def get_node_label(node, data_key_id):
    graphml = get_graphml()
    data = node.find(graphml.get("data") + "[@key='" + data_key_id + "']")
    shapenode = data.find(graphml.get("shapenode"))
    labels = shapenode.findall(graphml.get("nodelabel"))

    for label in labels:
        if label.text and len(label.text.strip()) > 0:
            return label.text
    return ""


def get_data_key_id(root):
    graphml = get_graphml()
    for key in root.findall(graphml.get("key")):
        if key.get("yfiles.type") and key.get("yfiles.type") == "nodegraphics":
            return key.get("id")
    return ""


def graphml_to_json(file, uniform_probability):
    graphml = get_graphml()
    file.seek(0)
    tree = ElementTree.parse(file)

    root = tree.getroot()
    graph = root.find(graphml.get("graph"))
    nodes = graph.findall(graphml.get("node"))
    out = {
        "uniformProbability": uniform_probability,
        "start": "",
        "end": "",
        "questions": {},
        "answers": {},
        "nodes": {},
    }

    ## node kan have different data elements.
    data_key_id = get_data_key_id(root)

    for node in nodes:
        nodeid = node.get("id")
        data = node.find(graphml.get("data") + "[@key='" + data_key_id + "']")
        shapenode = data.find(graphml.get("shapenode"))

        if shapenode is not None:
            shape = shapenode.find(graphml.get("shape")).get("type")

            nodelabel = get_node_label(node, data_key_id)

            node_edges = graph.findall(
                graphml.get("edge") + "[@source='" + str(nodeid) + "']"
            )

            ## ALL NODES AN THEIR SHAPE
            out["nodes"][nodeid] = {"id": nodeid, "shape": shape}

            ## SORT NODES BY TYPE
            if shape == "roundrectangle":
                answers = []
                for edge in node_edges:
                    target_id = edge.get("target")
                    edgedata = edge.find(graphml.get("data"))
                    line = edgedata.find(graphml.get("polyLine"))
                    edgelabel = None

                    answer_node = graph.find(
                        graphml.get("node") + "[@id='" + target_id + "']"
                    )
                    answer_data = answer_node.find(
                        graphml.get("data") + "[@key='" + data_key_id + "']"
                    )
                    answer_shapenode = answer_data.find(graphml.get("shapenode"))

                    shape = (
                        answer_shapenode.find(graphml.get("shape")).get("type")
                        if answer_shapenode.find(graphml.get("shape")) is not None
                        else ""
                    )

                    if line:
                        edgelabel = line.find(graphml.get("edgelabel"))

                    if not uniform_probability and edgelabel and edgelabel.text:
                        try:
                            answers.append(
                                {
                                    "id": target_id,
                                    "probability": float(edgelabel.text),
                                    "shape": shape,
                                }
                            )
                        except ValueError:
                            pass
                    else:
                        answers.append({"id": target_id, "shape": shape})

                out["questions"][nodeid] = {
                    "id": nodeid,
                    "shape": shape,
                    "label": nodelabel,
                    "answers": answers,
                }

            elif shape == "diamond":
                alternatives = [edge.get("target") for edge in node_edges]

                out["answers"][nodeid] = {
                    "id": nodeid,
                    "shape": shape,
                    "label": nodelabel,
                    "alternatives": alternatives,
                }
            elif "star" in str(shape):
                out["start"] = {
                    "id": nodeid,
                    "label": nodelabel,
                    "type": shape,
                    "firstQuestion": node_edges[0].get("target"),
                }
            elif shape == "octagon":
                out["end"] = nodeid

    return out
