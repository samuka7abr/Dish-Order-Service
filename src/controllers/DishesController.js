const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { title, description, price, category, ingredients } = request.body;
    const user_id = request.user.id;
    const is_admin = request.user.is_admin;

    if (!is_admin) {
      throw new AppError("Somente administradores podem criar pratos.", 403);
    }

    const [dish_id] = await knex("dishes").insert({
      title,
      description,
      price,
      category,
      user_id
    });

    const ingredientsInsert = ingredients.map(name => ({
      name,
      dish_id
    }));

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
  }

  async index(request, response) {
    const { title, ingredients } = request.query;

    let dishes;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map(ingredient => ingredient.trim());

      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.title",
          "dishes.description",
          "dishes.price",
          "dishes.category",
          "dishes.image"
        ])
        .whereIn("name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .groupBy("dishes.id")
        .orderBy("dishes.title");
    } else if (title) {
      dishes = await knex("dishes")
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    } else {
      dishes = await knex("dishes").orderBy("title");
    }

    const ingredientsList = await knex("ingredients");

    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = ingredientsList.filter(
        ingredient => ingredient.dish_id === dish.id
      );

      return {
        ...dish,
        ingredients: dishIngredients
      };
    });

    return response.json(dishesWithIngredients);
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({ dish_id: id });

    return response.json({
      ...dish,
      ingredients
    });
  }

  async update(request, response) {
    const { title, description, price, category, ingredients } = request.body;
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Prato não encontrado.");
    }

    await knex("dishes").where({ id }).update({
      title,
      description,
      price,
      category,
      updated_at: knex.fn.now()
    });

    if (ingredients) {
      await knex("ingredients").where({ dish_id: id }).delete();

      const ingredientsInsert = ingredients.map(name => ({
        name,
        dish_id: id
      }));

      await knex("ingredients").insert(ingredientsInsert);
    }

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    if (!dish) {
      throw new AppError("Prato não encontrado.");
    }

    await knex("dishes").where({ id }).delete();

    return response.json();
  }
}

module.exports = DishesController;
