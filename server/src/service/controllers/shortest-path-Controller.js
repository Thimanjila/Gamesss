const {
  startGame,
  saveSolution,
  getLast,
} = require("../models/shortest-path/shortest-pathModel");

async function generateRandomDistancesController(req, res) {
  const result = startGame();
  res.send(result);
}

async function submitDistanceController(req, res) {
  const result = await saveSolution(
    req.body.source,
    req.body.destination,
    req.body.path,
    req.body.player,
    req.body.graph
  );
  res.send(result);
}

async function getlasttime(req, res) {
  const result = await getLast();
  res.send(result);
}

module.exports = {
  generateRandomDistancesController,
  submitDistanceController,
  getlasttime,
};
