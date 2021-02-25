const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Database Connection
const mongoose = require('mongoose');
const databaseName = 'todoDB';
const dbURL = `mongodb://localhost:27017/${databaseName}`;

mongoose
	.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(console.log('Mongoose Connected\n'))
	.catch((err) => console.error(err));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static contents
app.use(express.static('public'));

// Renderer
app.set('view engine', 'ejs');

/////////////////////////////////////////////////////////////////////////

// Item Schema
const itemSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Empty item is pushed'],
	},
});
const Item = mongoose.model('Item', itemSchema);

/////////////////////////////////////////////////////////////////////////

// Create Item
const createItem = (data) => {
	const item = new Item({
		name: data,
	});
	item.save((err, doc) => {
		if (err) {
			console.error(err);
		} else {
			console.log('Item Saved in today: ', doc);
		}
	});
};

// Find and Remove by Id
const removeItemById = (itemId) => {
	Item.findByIdAndRemove(itemId, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Item is Removed Successfully');
		}
	});
};

/////////////////////////////////////////////////////////////////////////

// -------------- Get Home
app.get('/', (req, res) => {
	Item.find((err, foundItems) => {
		if (err) {
			console.log(err);
		} else {
			res.render('list', { listTitle: 'Today', newListItem: foundItems });
		}
	});
});

// -------------- Post Home
app.post('/', (req, res) => {
	const newItem = req.body.newItem;
	createItem(newItem);

	res.redirect('/');
});

app.post('/delete', (req, res) => {
	const checkedItemId = req.body.checked;
	removeItemById(checkedItemId);

	res.redirect('/');
});

/////////////////////////////////////////////////////////////////////////

app.listen(port, console.log(`Server started on http://localhost:${port}`));
