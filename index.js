const mongoose = require("./server/src/config/database.js");
const app = require("./server/src/app");
const port = process.env.PORT || 3001;

mongoose.connection.on("connected", function () {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

mongoose.connection.on("error", function (err) {
  console.error("Mongoose connection error:", err);
  process.exit(1);
});
