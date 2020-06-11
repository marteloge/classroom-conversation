
from .helpers import (
    get_graphml,
    get_tree_root_graph,
    get_all_nodes,
    get_all_edges,
    is_shape,
    get_shape,
    get_node_by_id
)


def has_one_star_node(file):
    (tree, root, graph, graphml) = get_tree_root_graph(file)
    nodes = get_all_nodes(graph)

    return len([node for node in nodes if is_shape("star", node, root)]) == 1


def has_octant_node(file):
    (tree, root, graph, graphml) = get_tree_root_graph(file)
    nodes = get_all_nodes(graph)

    return len([node for node in nodes if is_shape("octagon", node, root)]) > 0


def diamonds_connected_to_squares(file):
    (tree, root, graph, graphml) = get_tree_root_graph(file)
    nodes = [
        node for node in get_all_nodes(graph) if get_shape(node, root) == "diamond"
    ]

    for node in nodes:
        id = node.get("id")
        sources = [
            edge.get("target")
            for edge in graph.findall(
                graphml.get("edge") + "[@source='" + str(id) + "']"
            )
        ]

        for source in sources:
            source_node = get_node_by_id(source, graph)
            if not is_shape("roundrectangle", source_node, root):
                return False

    return True


def broken_conversation(file):
    (tree, root, graph, graphml) = get_tree_root_graph(file)
    nodes = [
        node
        for node in get_all_nodes(graph)
        if get_shape(node, root) in ["diamond", "roundrectangle"]
    ]

    for node in nodes:
        id = node.get("id")

        sources = [
            edge.get("target")
            for edge in graph.findall(
                graphml.get("edge") + "[@source='" + str(id) + "']"
            )
        ]

        if len(sources) == 0:
            return True

    return False


def all_nodes_connected(file):
    (tree, root, graph, graphml) = get_tree_root_graph(file)
    nodes = get_all_nodes(graph)
    edges = get_all_edges(graph)

    for node in nodes:
        id = node.get("id")
        source = graph.findall(graphml.get("edge") + "[@source='" + str(id) + "']")
        target = graph.findall(graphml.get("edge") + "[@target='" + str(id) + "']")
        if len(source) == 0 and len(target) == 0:
            return False
    return True


def has_illegal_node_shapes(file):
    (tree, root, graph, graphml) = get_tree_root_graph(file)
    nodes = get_all_nodes(graph)

    valid_shapes = [
        "star",
        "star5",
        "star6",
        "star8",
        "diamond",
        "roundrectangle",
        "octagon",
    ]

    invalid_shapes = [
        node
        for node in nodes
        if not any(get_shape(node, root) in shape for shape in valid_shapes)
    ]

    return len(invalid_shapes) > 0


def wrong_probability_distribution(file):
    (tree, root, graph, graphml) = get_tree_root_graph(file)
    edges = graph.findall(graphml.get("edge"))

    nodes = [
        node for node in get_all_nodes(graph) if is_shape("roundrectangle", node, root)
    ]

    for node in nodes:
        lines = [
            edge
            for edge in edges
            if edge.get("source") == node.get("id")
            and is_shape("diamond", get_node_by_id(edge.get("target"), graph), root)
        ]

        print("lines", len(lines), lines)

        sum = 0

        if len(lines) > 0:
            for line in lines:
                edgedata = line.find(graphml.get("data"))
                line = edgedata.find(graphml.get("polyLine"))
                edgelabel = line.find(graphml.get("edgelabel"))
                sum = sum + float(edgelabel.text)

            if sum != 1:
                return True

    return False


def missing_edge_probability(file):
    (tree, root, graph, graphml) = get_tree_root_graph(file)

    edges = graph.findall(graphml.get("edge"))
    nodes = [node for node in get_all_nodes(graph) if is_shape("diamond", node, root)]

    for node in nodes:
        lines = [edge for edge in edges if edge.get("target") == node.get("id")]

        for e in lines:
            edgedata = e.find(graphml.get("data"))
            line = edgedata.find(graphml.get("polyLine"))
            edgelabel = line.find(graphml.get("edgelabel"))

            if not edgelabel:
                # missing label
                return True
            else:
                try:
                    float(edgelabel.text)
                except ValueError:
                    # wrong format
                    return True
    return False

def one_type_of_child_nodes(file):
    (tree, root, graph, graphml) = get_tree_root_graph(file)

    edges = graph.findall(graphml.get("edge"))
    nodes = get_all_nodes(graph)

    for node in nodes:
        lines = [
            get_shape(get_node_by_id(edge.get("target"), graph), root)
            for edge in edges
            if edge.get("source") == node.get("id")
        ]

        if len(set(lines)) > 1:
            return False
    return True
