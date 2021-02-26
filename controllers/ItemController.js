const Item = require('../models/ItemModel');

const ItemController = () => {};

// Create Item
ItemController.createItem = (req, res) => {
	const newItem = req.body.newItem;

	const item = new Item({
		name: newItem,
	});
	item.save((err, doc) => {
		if (err) {
			console.error(err);
		} else {
			console.log('Item Saved: ', doc);
		}
	});

	res.redirect('/');
};

// Find and Remove by Id
ItemController.removeItemById = (req, res) => {
	const checkedItemId = req.body.checked;

	Item.findByIdAndRemove(checkedItemId, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Item Removed Successfully ', checkedItemId);
		}
	});

	res.redirect('/');
};

// Find items
ItemController.findItems = (req, res) => {
	Item.find((err, foundItems) => {
		if (err) {
			console.log(err);
		} else {
			res.render('list', { listTitle: 'Today', newListItem: foundItems });
		}
	});
};

// New list items
ItemController.newList = (req, res) => {
	const customList = req.params.customURL;

	res.send(`<h1 align=center> ${customList} </h1>`);
};

module.exports = ItemController;
