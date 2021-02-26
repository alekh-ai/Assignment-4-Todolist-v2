const express = require('express');
const router = express.Router();

const Item = require('../models/ItemModel');
const ItemController = require('../controllers/ItemController');

// -------------- Get all current List Items
router.get('/', (req, res) => {
	Item.find((err, foundItems) => {
		if (err) {
			console.log(err);
		} else {
			res.render('list', { listTitle: 'Today', newListItem: foundItems });
		}
	});
});

// -------------- Create a new List Item
router.post('/', (req, res) => {
	const newItem = req.body.newItem;

	ItemController.createItem(newItem);
	res.redirect('/');
});

// -------------- Delete Checked  List Item
router.post('/delete', (req, res) => {
	const checkedItemId = req.body.checked;

	ItemController.removeItemById(checkedItemId);
	res.redirect('/');
});

// -------------- Create a new List
router.get('/:customURL', (req, res) => {
	const customList = req.params.customURL;

	res.send(`<h1 align=center> ${customList} </h1>`);
});

module.exports = router;
