
exports.up = function(knex) {
    return knex.schema.createTable('pacients', function(table) {
        table.increments();

        table.string('name').notNullable();
        table.string('bed').notNullable();
        table.string('type').notNullable();
        table.string('age').notNullable();
        table.string('height').notNullable();
        table.string('weight').notNullable();
        table.string('gender').notNullable();
        table.string('admission_date').notNullable();
        table.string('diagnosis').notNullable();

        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pacients');
};
