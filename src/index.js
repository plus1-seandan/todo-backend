const express = require("express");
const cors = require("cors");
const { Pool, Client } = require("pg");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "postgres",
  port: 5432,
};

const main = async () => {
    const app = express();
    //add middleware

    app.use(cors());
    const pool = new Pool(credentials);

    app.listen(5000, () => {
      console.log(`🚀 Server ready at http://localhost:5000/`);
    });

    app.get('/tasks', async (req, res) => {
        const allTasks = await pool.query('SELECT * FROM tasks');
        const resultData = allTasks.rows
        res.status(200).send(resultData);
    });
  };
  
  main().catch((err) => {
    console.log(err);
  });