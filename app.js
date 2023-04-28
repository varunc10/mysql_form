const mysql = require('mysql2');
const path = require('path');
const express = require('express');
const app = express();

// set the views directory
app.set('views', path.join(__dirname, 'views'));


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Configure MySQL connection
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Sara1234$',
    database: 'sql_db'
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Connect to MySQL database

// Configure body-parser middleware to handle form data
// app.use(bodyParser.urlencoded({ extended: false }));

// // Serve static files from the 'public' directory
// app.use(express.static('public'));

// Handle form submission
app.post('/', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const password = req.body.password;
    const city = req.body.city;
    const gender = req.body.gender;
    const message = req.body.message;
    // Insert data into MySQL database
    connection.query(
        'INSERT INTO users (name, age, email, password, gender, city, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, age, email, password, gender, city, message],
        (err, result) => {
            if (err) {
                console.log('Error inserting data into MySQL database:', err);
                res.status(500).send('Internal server error');
                return;
            }
            console.log('Data inserted into MySQL database:', result);

            // Redirect back to home page
            res.redirect('/');
        }
    );
});

// Start server

app.get('/', (req, res) => {
    res.render('form');
})

app.get('/show', function (req, res) {
    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        const users = results.map(row => {
            return {
                id: row.id,
                name: row.name,
                age: row.age,
                email: row.email,
                password: row.password,
                gender: row.gender,
                city: row.city,
                message: row.message
            };
        });

        console.log(users);
        res.render('show', { users });

    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
