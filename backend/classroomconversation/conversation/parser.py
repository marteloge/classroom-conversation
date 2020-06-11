import xml.etree.ElementTree as ElementTree

from .helpers import get_graphml, get_node_data_key, get_node_label, get_edge_label


def graphml_to_json(file, uniform_probability):
    graphml = get_graphml()
    file.seek(0)
    tree = ElementTree.parse(file)

    root = tree.getroot()
    graph = root.find(graphml.get("graph"))
    nodes = graph.findall(graphml.get("node"))
    out = {
        "uniform": uniform,
        "start": "",
        "end": "",
        "questions": {},
        "answers": {},
        "nodes": {},
    }

    ## node kan have different data elements.
    data_key_id = get_node_data_key(root)

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

                    if not uniform_probability:
                        try:
                            answers.append(
                                {
                                    "id": target_id,
                                    "shape": shape,
                                    "probability": float(get_edge_label(edge, root)),
                                }
                            )
                        except ValueError:
                            answers.append(
                                {"id": target_id, "shape": shape, "probability": 0}
                            )
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
