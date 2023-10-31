const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    user: 'csce315_911_johnammon75',
    host: 'csce-315-db.engr.tamu.edu',
    database: 'csce315331_11b_db',
    password: 'Masonkeegan02!',
    port: 5432
};

const client = new Client(dbConfig);

client.connect(function (err) {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database!');
    }
});

app.get('/run-query', async (req, res) => {
    try {
        const { query } = req.query; // Assuming the query is sent from App.js as a query parameter

        // You might perform some validation or sanitization of the query here before executing it

        const result = await client.query(query);

        res.json({ result: result.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = process.env.PORT || 8000; // Use default port if available, otherwise, fallback to 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
