exports.up = knex => knex.schema.createTable("favorites", table => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
    table.unique(["user_id", "dish_id"]);
  });
  
  exports.down = knex => knex.schema.dropTable("favorites");
  