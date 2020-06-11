import xml.etree.ElementTree as ElementTree


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


########## VALIDATION HELPERS ###############


def get_node_data_key(root):
    graphml = get_graphml()
    for key in root.findall(graphml.get("key")):
        if key.get("yfiles.type") and key.get("yfiles.type") == "nodegraphics":
            return key.get("id")
    return ""


def get_edge_data_key(root):
    graphml = get_graphml()
    for key in root.findall(graphml.get("key")):
        if key.get("yfiles.type") and key.get("yfiles.type") == "edgegraphics":
            return key.get("id")
    return ""


def get_tree_root_graph(file):
    graphml = get_graphml()
    file.seek(0)
    tree = ElementTree.parse(file)
    root = tree.getroot()
    graph = root.find(graphml.get("graph"))

    return (tree, root, graph, graphml)


def get_all_nodes(graph):
    graphml = get_graphml()
    return graph.findall(graphml.get("node"))


def get_all_edges(graph):
    graphml = get_graphml()
    return graph.findall(graphml.get("edge"))


def get_edge_data(edge, root):
    data_key = get_edge_data_key(root)
    return edge.find(get_graphml().get("data") + "[@key='" + data_key + "']")


def get_node_by_id(id, graph):
    graphml = get_graphml()
    node = graph.find(graphml.get("node") + "[@id='" + id + "']")
    return node if node else None


### LABEL HELPERS ###


def get_node_label(node, root):
    data_key = get_node_data_key(root)

    graphml = get_graphml()
    data = node.find(graphml.get("data") + "[@key='" + data_key + "']")
    shapenode = data.find(graphml.get("shapenode"))
    labels = shapenode.findall(graphml.get("nodelabel"))

    for label in labels:
        if label.text and len(label.text.strip()) > 0:
            return label.text
    return ""


def get_edge_label(edge, root):
    graphml = get_graphml()
    data = get_edge_data(edge, root)
    line = data.find(graphml.get("polyLine"))

    if not line:
        return ""

    edgelabel = line.find(graphml.get("edgelabel"))

    if not edgelabel:
        return ""

    return edgelabel.text


### HELPERS NODE SHAPE ###


def get_node_shape(node, root):
    node_shape = None
    graphml = get_graphml()
    data_key_id = get_node_data_key(root)
    data = node.find(graphml.get("data") + "[@key='" + data_key_id + "']")
    shapenode = data.find(graphml.get("shapenode"))

    if shapenode is not None:
        node_shape = shapenode.find(graphml.get("shape")).get("type")
    return node_shape if node_shape else None


def is_node_shape(shape, node, root):
    node_shape = get_node_shape(node, root)
    return shape in node_shape if node_shape else False


def is_diamond(node, root):
    node_shape = get_node_shape(node, root)
    return "diamond" in node_shape if node_shape else False


def is_star(shape, node, root):
    node_shape = get_node_shape(node, root)
    return "star" in node_shape if node_shape else False


def is_rectangle(shape, node, root):
    node_shape = get_node_shape(node, root)
    return "roundrectangle" in node_shape if node_shape else False


def is_octagon(shape, node, root):
    node_shape = get_node_shape(node, root)
    return "octagon" in node_shape if node_shape else False


### PARSER HELPERS ###


def find_answers(edges, uniform, root, graph):
    answers = []
    for edge in edges:
        target = edge.get("target")
        answer_node = get_node_by_id(target, graph)
        answer_shape = get_node_shape(answer_node, root)

        if not uniform:
            probability = 0
            try:
                probability = float(get_edge_label(edge, root))
            except ValueError:
                pass

            answers.append(
                {"id": target, "shape": answer_shape, "probability": probability}
            )
        else:
            answers.append({"id": target, "shape": answer_shape})
    return answers
