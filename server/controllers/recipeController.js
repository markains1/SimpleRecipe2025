require('../models/database');
const Category = require('../models/Category');

/**
 * GET /
 * The Homepage
 */

exports.homepage = async (req, res) => {
  res.render('index');
};

async function insertDummyCategoryData() {
  try {
    await Category.insertMany([
      { name: 'Thai', image: 'thai-food.jpg' },
      { name: 'American', image: 'american-food.jpg' },
      { name: 'Chinese', image: 'chinese-food.jpg' },
      { name: 'Mexican', image: 'mexican-food.jpg' },
      { name: 'Indian', image: 'indian-food.jpg' },
      { name: 'Spanish', image: 'spanish-food.jpg' },
    ]);
  } catch (error) {
    console.log('Error', +error);
  }
}

insertDummyCategoryData();
