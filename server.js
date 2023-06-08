const express = require("express");
const usersRoutes = require("./routes/users");
const recipesRoutes = require("./routes/recipes");
const healthRoutes = require("./routes/health");
const logger = require("./middlewares/logger");
const auth = require("./middlewares/auth");

const server = express();
server.use(express.json());

server.use(logger);
server.use(auth);

server.use(usersRoutes.router);
server.use(recipesRoutes.router);
server.use(healthRoutes.router);

module.exports = {
    server
};