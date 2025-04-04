const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class DishesPhotoController {
  async update(request, response) {
    const { id: dish_id } = request.params;
    const user_id = request.user.id;
    const is_admin = request.user.is_admin;
    const photoFilename = request.file.filename;

    if (!is_admin) {
      throw new AppError("Somente administradores podem atualizar fotos de pratos.", 403);
    }

    const dish = await knex("dishes").where({ id: dish_id }).first();

    if (!dish) {
      throw new AppError("Prato não encontrado.");
    }

    const diskStorage = new DiskStorage();

    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }

    const filename = await diskStorage.saveFile(photoFilename);

    dish.image = filename;

    await knex("dishes").where({ id: dish_id }).update({ image: filename });

    return response.json({ message: "Imagem atualizada com sucesso", image: filename });
  }
}

module.exports = DishesPhotoController;
