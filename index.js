const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const server = express();
server.use(express.json());
const db = knex(knexConfig.development);
// functions
const stdGet = (tbl) => (req, res) => {
    db(tbl)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

const stdGetById = (tbl) => (req, res) => {
    db(tbl)
    .where({ id: req.params.id })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Cohort not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

const stdPost = (tbl) => (req, res) => {
    db(tbl)
    .insert(req.body)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

const stdDelById = (tbl) => (req, res) => {
    db(tbl)
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

const stdPutById = (tbl) => (req, res) => {
    db(tbl)
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    })
    .catch(err => res.status(500).json(err));
}

// get cohorts
const tableNames = ['cohorts', 'students']
tableNames.forEach(name=>{
    server.get(`/api/${name}`, stdGet(name));
    server.get(`/api/${name}/:id`, stdGetById(name));
    server.post(`/api/${name}`, stdPost(name));
    server.delete(`/api/${name}/:id`, stdDelById(name));
    server.put(`/api/${name}/:id`, stdPutById(name));
});

// get cohort by id
// server.get("/api/cohorts/:id", (req, res) => {
//   db("cohorts")
//     .where({ id: req.params.id })
//     .then(cohort => {
//       if (cohort.length > 0) {
//         res.status(200).json(cohort);
//       } else {
//         res.status(404).json({ message: "Cohort not found" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });
// get students by cohort id
server.get("/api/cohorts/:id/students", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .then(cohort => {
      if (cohort.length > 0) {
        db("students")
          .where({ cohort_id: req.params.id })
          .then(cohort => {
            if (cohort.length > 0) {
              res.status(200).json(cohort);
            } else {
              res.status(404).json({
                message: `Cohort with ID: ${
                  req.params.id
                } does not contain students.`
              });
            }
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else {
        res.status(404).json({
          Error_Message: `Cohort with the ID: ${req.params.id} does not exist.`
        });
      }
    });
});
// add cohorts
// server.post("/api/cohorts", (req, res) => {
//   db("cohorts")
//     .insert(req.body)
//     .then(ids => {
//       res.status(201).json(ids);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });
// delete cohorts
// server.delete("/api/cohorts/:id", (req, res) => {
//   db("cohorts")
//     .where({ id: req.params.id })
//     .del()
//     .then(count => {
//       res.status(200).json(count);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });
// update cohorts
// server.put("/api/cohorts/:id", (req, res) => {
//   const changes = req.body;
//   db("cohorts")
//     .where({ id: req.params.id })
//     .update(changes)
//     .then(count => {
//       if (count) {
//         res.status(200).json(count);
//       } else {
//         res.status(404).json({ message: "Cohort not found" });
//       }
//     })
//     .catch(err => res.status(500).json(err));
// });
// get all students
// server.get("/api/students", (req, res) => {
//   db("students")
//     .then(students => {
//       res.status(200).json(students);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });
// get students by ID
// server.get("/api/students/:id", (req, res) => {
//   db("students")
//     .where({ id: req.params.id })
//     .then(student => {
//       if (student.length > 0) {
//         res.status(200).json(student);
//       } else {
//         res
//           .status(404)
//           .json({
//             Error_Message: `student id: ${req.params.id} does not exist`
//           });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });
// get students by ID modified
// server.get("/api/students/:id", (req, res) => {
//   db.select('students.id', 'students.name', 'cohorts.name as cohort')
//     .from("students")
//     .innerJoin('cohorts', 'cohorts.id', '=', 'students.cohort_id')
//     .where({'students.id': req.params.id })
//     .then(student => {
//       if (student.length > 0) {
//         res.status(200).json(student);
//       } else {
//         res.status(404).json({
//           Error_Message: `student id: ${req.params.id} does not exist`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });
// create students
// server.post("/api/students", (req, res) => {
//   db("students")
//     .insert(req.body)
//     .then(id => {
//       res.status(201).json(id);
//     })
//     .catch(err => {
//       err.status(500).json(err);
//     });
// });
// delete students
// server.delete("/api/students/:id", (req, res) => {
//   db("students")
//     .where({ id: req.params.id })
//     .del()
//     .then(count => {
//       res.status(200).json(count);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });
// update cohorts
// server.put("/api/students/:id", (req, res) => {
//   db("students")
//     .where({ id: req.params.id })
//     .update(req.body)
//     .then(count => {
//       if (count) {
//         res.status(200).json(count);
//       } else {
//         res.status(404).json({ message: "Student not found" });
//       }
//     })
//     .catch(err => res.status(500).json(err));
// });

// listen for server
const PORT = 5100;
server.listen(PORT, () => {
  console.log(`running server on port ${PORT}`);
});
