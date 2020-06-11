import xml.etree.ElementTree as ElementTree

from .helpers import (
    get_node_label,
    get_edge_label,
    get_node_shape,
    get_tree_root_graph,
    get_node_by_id,
    find_answers,
)


def graphml_to_json(file, uniform):
    (tree, root, graph, graphml) = get_tree_root_graph(file)
    nodes = graph.findall(graphml.get("node"))

    out = {
        "uniform": uniform,
        "start": "",
        "end": "",
        "questions": {},
        "answers": {},
        "nodes": {},
    }

    for node in nodes:
        id = node.get("id")
        shape = get_node_shape(node, root)

        if shape is None:
            continue

        label = get_node_label(node, root)
        edges = graph.findall(graphml.get("edge") + "[@source='" + id + "']")

        out["nodes"][id] = {"id": id, "shape": shape}

        if shape == "roundrectangle":
            answers = find_answers(edges, uniform, root, graph)
            out["questions"][id] = {
                "id": id,
                "shape": shape,
                "label": label,
                "answers": answers,
            }
        elif shape == "diamond":
            out["answers"][id] = {
                "id": id,
                "shape": shape,
                "label": label,
                "alternatives": [edge.get("target") for edge in edges],
            }
        elif "star" in shape:
            out["start"] = {
                "id": id,
                "label": label,
                "type": shape,
                "firstQuestion": edges[0].get("target"),
            }
        elif shape == "octagon":
            out["end"] = id

    return out
