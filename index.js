const express = require("express");
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const server = express();
server.use(express.json());
const db = knex(knexConfig.development);

server.get("/", (req, res) => {
    res.send("api working");
});

const PORT = 5100;
server.listen(PORT, ()=>{
    console.log(`running server on port ${PORT}`);
});