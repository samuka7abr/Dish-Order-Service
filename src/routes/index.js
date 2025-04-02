const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const dishesRoutes = require("./dishes.routes");
const favoritesRoutes = require("./favorites.routes");
const ordersRoutes = require("./orders.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/favorites", favoritesRoutes);
routes.use("/orders", ordersRoutes);

module.exports = routes;
