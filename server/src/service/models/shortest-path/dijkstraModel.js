// Helper function to extract the graph data
function extractGraphData(graph) {
  const edges = new Map();

  for (const [node, neighbors] of Object.entries(graph)) {
    const nodeEdges = new Map();

    for (const [neighbor, weight] of Object.entries(neighbors)) {
      nodeEdges.set(neighbor, parseInt(weight));
    }

    edges.set(node, nodeEdges);
  }

  return edges;
}

// Function to find the shortest path using Dijkstra's algorithm
function dijkstra(graph, start, end) {
  const distances = new Map();
  const previous = new Map();

  // Set initial values
  for (const node of graph.keys()) {
    distances.set(node, Infinity);
  }
  distances.set(start, 0);

  // Priority queue
  const unvisitedNodes = new PriorityQueue(
    (a, b) => distances.get(a) - distances.get(b)
  );

  unvisitedNodes.enqueue(start);

  while (!unvisitedNodes.isEmpty()) {
    const currentNode = unvisitedNodes.dequeue();

    if (currentNode === end) break;

    // Check if currentNode has neighbors
    if (!graph.get(currentNode)) continue;

    for (const [neighbor, weight] of graph.get(currentNode)) {
      const tentativeDistance = distances.get(currentNode) + weight;

      if (tentativeDistance < distances.get(neighbor)) {
        distances.set(neighbor, tentativeDistance);
        previous.set(neighbor, currentNode);
        unvisitedNodes.enqueue(neighbor);
      }
    }
  }

  // Reconstruct the shortest path
  const path = [];
  let currentNode = end;

  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previous.get(currentNode);
  }

  return {
    distance: distances.get(end),
    path: path,
  };
}

// Priority queue implementation using a binary heap
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    this.values.push({ value, priority });
    this.bubbleUp();
  }

  dequeue() {
    const min = this.values.shift();
    const last = this.values.pop();

    if (last) {
      this.values.unshift(last);
      this.bubbleDown();
    }

    return min.value;
  }

  bubbleUp() {
    let index = this.values.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const { value, priority } = this.values[parentIndex];
      const { value: childValue, priority: childPriority } = this.values[index];

      if (priority >= childPriority) break;

      this.values[parentIndex] = { value: childValue, priority: childPriority };
      this.values[index] = { value, priority };

      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      let minIndex = index;

      if (
        leftChildIndex < this.values.length &&
        this.values[leftChildIndex].priority < this.values[minIndex].priority
      ) {
        minIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.values.length &&
        this.values[rightChildIndex].priority < this.values[minIndex].priority
      ) {
        minIndex = rightChildIndex;
      }

      if (minIndex === index) break;

      [this.values[index], this.values[minIndex]] = [
        this.values[minIndex],
        this.values[index],
      ];

      index = minIndex;
    }
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

function findShortestPath(graph, start, end) {
  const edges = extractGraphData(graph);
  const result = dijkstra(edges, start, end);
  return result;
}

module.exports = { findShortestPath };
