// Function to create a graph with vertices labeled from A to I
function createGraph(
  vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
) {
  const graph = {};
  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    graph[vertex] = {};
    for (let j = 0; j < i; j++) {
      const otherVertex = vertices[j];
      graph[vertex][otherVertex] = "";
    }
  }
  return graph;
}

// Function to add an edge using vertex labels
function addEdgeByLabels(graph, sourceLabel, destinationLabel, weight) {
  if (!graph[sourceLabel] || !graph[destinationLabel]) {
    console.error(
      "One or both of the specified vertices do not exist in the graph."
    );
    return;
  }
  graph[sourceLabel][destinationLabel] = weight;
  return graph;
}

module.exports = {
  createGraph,
  addEdgeByLabels,
};

// Example usage:
//   const myGraph = createGraph();
//   console.log(myGraph);
//   addEdgeByLabels(myGraph, 'A', 'B', 10);
//   console.log(myGraph);
