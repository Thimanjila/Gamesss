const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortestPathTimeSchema = new Schema({
  dijkstra: {
    type: Number,
    required: true,
  },
  bellmanFord: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const shortestPathTimeModel = mongoose.model(
  "shortestPathTime",
  shortestPathTimeSchema
);

module.exports = shortestPathTimeModel;
