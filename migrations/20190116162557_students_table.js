exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", tbl => {
    tbl.increments();
    tbl.string("name", 50);
    tbl
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts");
    tbl.timestamps(true, true);
    tbl.unique("name", "uq_student_name");
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfItExists("students");
};
