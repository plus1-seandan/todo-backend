const express = require("express");
const cors = require("cors");

const main = async () => {
    const app = express();
    //add middleware

    app.use(cors());
  
    app.listen(5000, () => {
      console.log(`🚀 Server ready at http://localhost:5000/`);
    });

    app.get('/tasks', (req, res) => {
        res.send('these are tasks')
    });
  };
  
  main().catch((err) => {
    console.log(err);
  });