const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: 'You need to provide a name 50 char max!',
      minlength: 1,
      maxlength: 50
    },
    itemLocation: {
      type: String,
      required: true
    },
    itemImage: {
      type: String,
      required: 'You Need to add an image!'
    },
    itemPrice: {
      type: Number,
      required: 'Minimum price required 0.99 🤑',
      minlength: 0.99
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Item = model('Item', itemSchema);

module.exports = Item;
