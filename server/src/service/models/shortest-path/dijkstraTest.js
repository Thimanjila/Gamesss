class Graph {
  constructor() {
    this.vertices = [];
    this.adjacencyList = {};
  }

  vertexWithMinDistance(distances, visited) {
    let minDistance = Infinity,
      minVertex = null;
    for (let vertex in distances) {
      let distance = distances[vertex];
      if (distance < minDistance && !visited.has(vertex)) {
        minDistance = distance;
        minVertex = vertex;
      }
    }
    return minVertex;
  }

  dijkstra(source, destination) {
    let distances = {},
      parents = {},
      visited = new Set();
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i] === source) {
        distances[source] = 0;
      } else {
        distances[this.vertices[i]] = Infinity;
      }
      parents[this.vertices[i]] = null;
    }

    let currVertex = this.vertexWithMinDistance(distances, visited);

    while (currVertex !== null) {
      if (currVertex === destination) {
        break; // Terminate if destination is reached
      }
      let distance = distances[currVertex],
        neighbors = this.adjacencyList[currVertex];
      for (let neighbor in neighbors) {
        let newDistance = distance + neighbors[neighbor];
        if (distances[neighbor] > newDistance) {
          distances[neighbor] = newDistance;
          parents[neighbor] = currVertex;
        }
      }
      visited.add(currVertex);
      currVertex = this.vertexWithMinDistance(distances, visited);
    }

    // Output shortest distance and path
    let path = [];
    let currentVertex = destination;
    while (currentVertex !== null) {
      path.unshift(currentVertex);
      currentVertex = parents[currentVertex];
    }

    if (distances[destination] === Infinity) {
      return null;
    } else {
      return { distance: distances[destination], path };
    }
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.adjacencyList[vertex] = {};
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight;
    this.adjacencyList[vertex2][vertex1] = weight;
  }

  changeWeight(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight;
    this.adjacencyList[vertex2][vertex1] = weight;
  }
}

function createGraph(graphData) {
  const graph = new Graph();
  for (let vertex in graphData) {
    graph.addVertex(vertex);
    for (let neighbor in graphData[vertex]) {
      graph.addEdge(vertex, neighbor, graphData[vertex][neighbor]);
    }
  }
  return graph;
}

function bellmanFord(graph, startVertexKey, destinationVertexKey) {
  const distances = {};
  const previousVertices = {};

  graph.vertices.forEach((vertexKey) => {
    distances[vertexKey] = Infinity;
    previousVertices[vertexKey] = null;
  });

  distances[startVertexKey] = 0;

  for (let i = 0; i < graph.vertices.length - 1; i++) {
    graph.vertices.forEach((vertexKey) => {
      const vertex = graph.adjacencyList[vertexKey];
      Object.keys(vertex).forEach((neighborKey) => {
        const weight = vertex[neighborKey];
        if (
          distances[vertexKey] !== Infinity &&
          distances[vertexKey] + weight < distances[neighborKey]
        ) {
          distances[neighborKey] = distances[vertexKey] + weight;
          previousVertices[neighborKey] = vertexKey;
        }
      });
    });
  }

  graph.vertices.forEach((vertexKey) => {
    const vertex = graph.adjacencyList[vertexKey];
    Object.keys(vertex).forEach((neighborKey) => {
      const weight = vertex[neighborKey];
      if (
        distances[vertexKey] !== Infinity &&
        distances[vertexKey] + weight < distances[neighborKey]
      ) {
        throw new Error("Graph contains negative weight cycle");
      }
    });
  });

  let shortestPath = [];
  if (destinationVertexKey) {
    let currentVertexKey = destinationVertexKey;
    while (currentVertexKey !== null) {
      shortestPath.unshift(currentVertexKey);
      currentVertexKey = previousVertices[currentVertexKey];
    }
  }

  return {
    distance: distances[destinationVertexKey],
    path: shortestPath,
  };
}

function checkShortestPath(graph, source, destination) {
  const graphs = createGraph(graph);
  const startTimeBell = process.hrtime();
  const bell = bellmanFord(graphs, source, destination);
  const endTimeBell = process.hrtime(startTimeBell);
  const startTimeDijk = process.hrtime();
  const dijk = graphs.dijkstra(source, destination);
  const endTimeDijk = process.hrtime(startTimeDijk);

  const timeBell = endTimeBell[0] * 1000 + endTimeBell[1] / 1000000;
  const timeDijk = endTimeDijk[0] * 1000 + endTimeDijk[1] / 1000000;
  return { bell, dijk, timeBell, timeDijk };
}

module.exports = { checkShortestPath };
