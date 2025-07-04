const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'This field is required',
    },
    description: {
      type: String,
      required: 'This field is required',
    },
    source: {
      type: String,
      required: 'This field is required',
    },
    email: {
      type: String,
      required: 'This field is required',
    },
    ingredients: {
      type: Array,
      required: 'This field is required',
    },
    steps: {
      type: Array,
      required: 'This field is required',
    },
    category: {
      type: String,
      enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
      required: 'This field is required',
    },
    image: {
      type: String,
      required: 'This field is required',
    },
  },
  { collection: 'recipes' }
);

recipeSchema.index({ name: 'text', description: 'text' });
// Add Wildcard indexing?
// recipeSchema.index({ "$**" : 'text'});

module.exports = mongoose.model('Recipe', recipeSchema);
