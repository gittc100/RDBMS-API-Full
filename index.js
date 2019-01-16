const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const server = express();
server.use(express.json());
const db = knex(knexConfig.development);

server.get("/", (req, res) => {
  res.send("api working");
});

// get cohorts
server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get cohort by id

server.get("/api/cohorts/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .then(cohort => {
      if (cohort.length > 0) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: "Cohort not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

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
              res.status(404).json({ message: `Cohort with ID: ${req.params.id} does not contain students.` });
            }
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else {
        res
          .status(404)
          .json({
            Error_Message: `Cohort with the ID: ${
              req.params.id
            } does not exist.`
          });
      }
    });
});

// add cohorts

server.post("/api/cohorts", (req, res) => {
  db("cohorts")
    .insert(req.body)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// delete cohorts

server.delete("/api/cohorts/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update cohorts
server.put("/api/cohorts/:id", (req, res) => {
  const changes = req.body;

  db("cohorts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Cohort not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

const PORT = 5100;
server.listen(PORT, () => {
  console.log(`running server on port ${PORT}`);
});
