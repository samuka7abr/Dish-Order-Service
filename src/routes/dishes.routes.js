const uploadConfig = require("../configs/uploads");
const { Router, request } = require("express");
const multer = require("multer");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const DishesController = require("../controllers/DishesController");

const dishesController = new DishesController();
const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

dishesRoutes.delete("/:id", ensureAuthenticated, dishesController.delete);
dishesRoutes.put("/:id", ensureAuthenticated, dishesController.update);
dishesRoutes.post("/", ensureAuthenticated, dishesController.create);
dishesRoutes.patch("/foto", ensureAuthenticated, upload.single("file"), (request, response) => {
    console.log(request.file.filename);
    response.json();
});
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.index);

module.exports = dishesRoutes;
