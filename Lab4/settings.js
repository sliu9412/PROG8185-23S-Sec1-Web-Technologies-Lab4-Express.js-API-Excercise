const path = require("path");

module.exports = {
  uploadFolder: path.join(path.dirname(__filename), "upload"),
  staticFolder: path.join(path.dirname(__filename), "assets"),
  databaseUrl: "mongodb://localhost:27017",
  databaseName: "testDatabase",
  databaseCollectionName: "testCollection",
};
