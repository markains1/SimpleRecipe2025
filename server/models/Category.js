const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'This field is required',
    },
    image: {
      type: String,
      required: 'This field is required',
    },
  },
  { collection: 'categories' }
);

module.exports = mongoose.model('Category', categorySchema);
