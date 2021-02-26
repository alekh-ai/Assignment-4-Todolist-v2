const mongoose = require('mongoose');

// Item Schema
const itemSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Empty item is pushed'],
	},
});
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
