const express = require('express');
const router = express.Router();

// const Item = require('../models/ItemModel');
const ItemController = require('../controllers/ItemController');

// -------------- Get all current List Items
router.get('/', ItemController.findItems);

// -------------- Create a new List Item
router.post('/', ItemController.createItem);

// -------------- Delete Checked  List Item
router.post('/delete', ItemController.removeItemById);

// -------------- Create a new List
router.get('/:customURL', ItemController.newList);

module.exports = router;
