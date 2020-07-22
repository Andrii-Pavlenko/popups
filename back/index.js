require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const { Client } = require("pg");
const cors = require("cors");
const port = +process.env.PORT || 5000;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();
// app.use(cors());
app.get("/api/text", (req, res) => {
  client.query("SELECT * FROM text ORDER BY id", (err, dbResponse) => {
    if (err) {
      res.satus(403);
      res.json(err);
    } else if (dbResponse) {
      res.json(dbResponse.rows);
    }
  });
});

app.post("/api/text", bodyParser.json(), (req, res) => {
  const { inputValue } = req.body;
  client.query(
    "INSERT INTO text (text) VALUES ( $1 ) RETURNING id",
    [inputValue],
    (err, dbResponse) => {
      if (err) {
        res.status(403);
        res.json(err);
      } else {
        res.status(200);
        res.json({
          id: dbResponse.rows[0].id,
          text: inputValue,
        });
      }
    }
  );
});

app.use(express.static(path.join(__dirname, "../front/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
