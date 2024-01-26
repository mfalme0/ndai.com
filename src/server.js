const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = 8080; // Set your desired port number

app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jungle24.",
  database: "admin",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.message);
  } else {
    console.log("Connected to the database");
  }
});

// Define an API endpoint to check availability
app.get('/availability', (req, res) => {
  const id = [1, 2, 3];
  const query = 'SELECT id, state FROM cars WHERE id IN (?)';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database query error ' + err.stack);
      res.status(500).send('Error retrieving data');
    } else {
      const availabilityData = {};
      results.forEach((row) => {
        availabilityData[row.id] = row.state;
      });
      res.json(availabilityData);
    }
  });
});


app.post('/addcar', (req, res) => {
  const { make, model, year, plates, carimage, transmission, fuel, engine, seats } = req.body;
  const availability = 'available'; // Set availability to always 'available'
  const query = 'INSERT INTO addcars(make, model, year, plates, carimage, availability, transmission, fuel, engine, seats) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [make, model, year, plates, carimage, availability, transmission, fuel, engine, seats], (err, results) => {
    if (err) {
      console.error('Database query error ' + err.stack);
      res.status(500).send('Error inserting data');
    } else {
      res.status(200).send('Data inserted successfully');
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
