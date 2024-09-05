const { createGraph, addEdgeByLabels } = require("./graphModel");
const { checkShortestPath } = require("./dijkstraTest");
const shortestPathModel = require("../../db-models/shortestPathModel");
const shortestPathTimeModel = require("../../db-models/shortestPathAlgoTimes");

function generateRandomDistances() {
  let graph = createGraph();
  let vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  for (let i = 1; i < vertices.length; i++) {
    for (let j = 0; j < i; j++) {
      addEdgeByLabels(
        graph,
        vertices[i],
        vertices[j],
        Math.floor(Math.random() * 45) + 5
      );
    }
  }

  return graph;
}

function startGame() {
  let graph = generateRandomDistances();

  let sourceCity = Object.keys(graph)[Math.floor(Math.random() * 10)]; // Choose a random city from the graph

  let destinationCity = Object.keys(graph)[Math.floor(Math.random() * 10)]; // Choose a random city from the graph

  while (sourceCity === destinationCity) {
    destinationCity = Object.keys(graph)[Math.floor(Math.random() * 10)]; // Choose a random city from the graph
  }

  delete graph[sourceCity][destinationCity];
  delete graph[destinationCity][sourceCity];

  return {
    graph,
    sourceCity,
    destinationCity,
  };
}

async function saveSolution(source, destination, path, player, graph) {
  const res = checkShortestPath(graph, source, destination);

  const correctPath = res.dijk.path;

  if (res) {
    await shortestPathTimeModel.create({
      dijkstra: res.timeDijk,
      bellmanFord: res.timeBell,
    });
  }

  let isCorrect = true;

  if (path.length !== correctPath.length) {
    isCorrect = false;
  }

  for (let i = 0; i < path.length; i++) {
    if (path[i] !== correctPath[i]) {
      isCorrect = false;
      break;
    }
  }

  if (isCorrect) {
    await shortestPathModel.create({
      start: source,
      end: destination,
      path,
      distance: res.dijk.distance,
      player,
      graph,
    });
  }

  return {
    correct: isCorrect,
    correctPath,
    playerPath: path,
  };
}

async function getLast() {
  return await shortestPathTimeModel.findOne().sort({ _id: -1 });
}

module.exports = { startGame, saveSolution, getLast };
