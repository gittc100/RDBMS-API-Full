
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'yeet', cohort_id: 1},
        {name: 'big yeet', cohort_id: 1},
        {name: 'mega yeet', cohort_id: 2}
      ]);
    });
};
