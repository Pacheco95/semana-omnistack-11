const bounds = require('../../config/bounds.json').tables.incidents.fields;

exports.up = function(knex) {
  return knex.schema.createTable('incidents', table => {
    table.increments();
    table.string('title', bounds.title.length.max).notNullable();
    table.string('description', bounds.description.length.max).notNullable();
    table.decimal('value', bounds.value.precision).notNullable();
    
    table.string('ongId', bounds.ongId.length.max).notNullable();
    table.foreign('ongId').references('id').inTable('ongs');
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
