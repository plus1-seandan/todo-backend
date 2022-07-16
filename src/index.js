const express = require("express");
const cors = require("cors");
const { Pool, Client } = require("pg");
const bodyParser = require("body-parser");

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
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const pool = new Pool(credentials);

    app.listen(5000, () => {
      console.log(`🚀 Server ready at http://localhost:5000/`);
    });

    app.get('/tasks', async (req, res) => {
        const allTasks = await pool.query('SELECT * FROM tasks');
        const resultData = allTasks.rows
        res.status(200).send(resultData);
    });

    app.post('/tasks', async (req, res) => {
        const id = req.body.id; 
        const description = req.body.description; 
        await pool.query(`INSERT INTO tasks (id, description) VALUES (${id}, '${description}')`);

        res.status(200).send(`Successfully saved task: ${description}`);
    });
  };
  
  main().catch((err) => {
    console.log(err);
  });