const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Database Connection
const mongoose = require('mongoose');
const databaseName = 'todoDB';
const dbURL = `mongodb://localhost:27017/${databaseName}`;

mongoose
	.connect(dbURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(console.log('\nMongoose Connected'))
	.catch((err) => console.error(err));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static contents
app.use(express.static('public'));

// Renderer
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/appRoute'));

app.listen(port, console.log(`Server started on http://localhost:${port}`));
