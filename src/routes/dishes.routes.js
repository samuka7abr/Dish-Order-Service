const { Router } = require("express");
const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishesRoutes = Router();
const dishesController = new DishesController();

dishesRoutes.post("/", ensureAuthenticated, dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.put("/:id", ensureAuthenticated, dishesController.update);
dishesRoutes.delete("/:id", ensureAuthenticated, dishesController.delete);

module.exports = dishesRoutes;
