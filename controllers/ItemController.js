const Item = require('../models/ItemModel');

const ItemController = () => {};

// Create Item
ItemController.createItem = (data) => {
	const item = new Item({
		name: data,
	});
	item.save((err, doc) => {
		if (err) {
			console.error(err);
		} else {
			console.log('Item Saved: ', doc);
		}
	});
};

// Find and Remove by Id
ItemController.removeItemById = (itemId) => {
	Item.findByIdAndRemove(itemId, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Item Removed Successfully ', itemId);
		}
	});
};

module.exports = ItemController;
