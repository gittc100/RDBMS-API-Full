
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', (tbl) => {
    tbl.increments();
    tbl.string('name', 50);
    tbl.timestamps(true, true);
    tbl.unique('name', 'uq_cohort_name');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfItExists('cohorts');
};
