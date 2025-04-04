const { Router } = require("express");
const multer = require("multer");

const uploadConfig = require("../configs/uploads");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const DishesController = require("../controllers/DishesController");
const DishesPhotoController = require("../controllers/DishesPhotoController");

const dishesController = new DishesController();
const dishesPhotoController = new DishesPhotoController();
const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

dishesRoutes.post("/", ensureAuthenticated, dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.put("/:id", ensureAuthenticated, dishesController.update);
dishesRoutes.delete("/:id", ensureAuthenticated, dishesController.delete);
dishesRoutes.patch("/:id/photo", ensureAuthenticated, upload.single("file"), dishesPhotoController.update);

module.exports = dishesRoutes;
 