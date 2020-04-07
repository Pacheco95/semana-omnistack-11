const bounds = require('../../config/bounds.json').tables.ongs.fields;

exports.up = function(knex) {
  return knex.schema.createTable('ongs', table => {
    table.string('id', bounds.id.length.max).primary();
    table.string('name', bounds.name.length.max).notNullable();
    table.string('email', bounds.email.length.max).notNullable().unique();
    table.string('password', bounds.password.length.max).notNullable();
    table.string('whatsapp', bounds.whatsapp.length.max).notNullable();
    table.string('city', bounds.city.length.max).notNullable();
    table.string('uf', bounds.uf.length.max).notNullable();
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
