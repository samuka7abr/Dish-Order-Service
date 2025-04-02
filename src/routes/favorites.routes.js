const { Router } = require("express");
const FavoritesController = require("../controllers/FavoritesController");

const favoritesRoutes = Router();
const favoritesController = new FavoritesController();

favoritesRoutes.post("/:dish_id", favoritesController.toggle);
favoritesRoutes.get("/", favoritesController.index);

module.exports = favoritesRoutes;
