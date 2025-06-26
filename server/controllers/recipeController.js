require('../models/database');
const { receiveMessageOnPort } = require('worker_threads');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

/**
 * GET /
 * The Homepage
 */

exports.homepage = async (req, res) => {
  try {
    // Get the 5 categories from the db
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    const food = { latest };

    res.render('index', { title: 'Poppys Table', categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error Occured - homepage' });
  }
};

/**
 * Get /categories
 * Categories
 */
exports.exploreCategories = async (req, res) => {
  try {
    // Get the 5 categories from the db
    const limitNumber = 20; // TODO: Later, add pagination, no limit...
    const categories = await Category.find({}).limit(limitNumber);

    res.render('categories', { title: 'Poppys Table - Categories', categories });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error Occured - exploreCategories' });
  }
};
/**
 * Get /category by id
 * Categories
 */
exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryId = req.params.id;

    // Get the 5 categories from the db
    const limitNumber = 20; // TODO: Later, add pagination, no limit...
    const categoryById = await Recipe.find({ category: categoryId }).limit(limitNumber);

    res.render('categories', { title: 'Poppys Table - Categories', categoryById });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error Occured - exploreCategoriesById' });
  }
};

/**
 * Get /recipe/:id
 * Recipe
 */
exports.exploreRecipe = async (req, res) => {
  try {
    // Get the recipe details from the db by its internal id
    let recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);

    res.render('recipe', { title: 'Poppys Table - Recipe', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error Occured - exploreRecipe' });
  }
};

/**
 * POST /searchid
 * Search
 */

// searchTerm

exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });

    //res.json(recipe); //Debug, what's the json data we got from mongodb?
    res.render('search', { title: 'Poppys Table - Search', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error Occured - exploreRecipe' });
  }
};

/**
 * Get /explore-latest
 * Explore Latest
 */
exports.exploreLatest = async (req, res) => {
  try {
    // Get the list of latest recipies
    const limitNumber = 20; // TODO: Later, add pagination, no limit...
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    res.render('explore-latest', { title: 'Poppys Table - Latest Recipes', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error Occured - exploreRecipe' });
  }
};

/**
 * Get /explore-random
 * Explore Random
 */
exports.exploreRandom = async (req, res) => {
  try {
    // Get a random recipe
    let count = await Recipe.find().countDocuments;
    let random = Math.floor(Math.random() * count);

    let recipe = await Recipe.findOne().skip(random).exec();
    //res.json(recipe); //TODO: Add actual page, just show the json data we got from mongodb...

    res.render('recipe', { title: 'Poppys Table - Recipe', recipe });
    // res.render('explore-random', { title: 'Poppys Table - Rando Recipe', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error Occured - exploreRandom' });
  }
};


/**
 * Get /submit-recipe
 * Submit Recipe
 */
exports.submitRecipe = async (req, res) => {
  res.render('submit-recipe', { title: 'Poppys Table - Submit Recipe' });


}

// Just for initial insert of a set of Recipes  into the DB
/** Initial Data Insert Turned Off 
async function insertInitialRecipeData() {
  try {
    await Recipe.insertMany([
      {
        name: 'Thai Shrimp Curry with Yummy Shallot Crispies',
        description: 'A delicious curry dish',
        email: 'markains1@gmail.com',
        source: 'https://pinchofyum.com/thai-shrimp-curry-with-yummy-shallot-crispies',
        ingredients: [
          '1 tablespoon avocado oil',
          '2 tablespoons red curry paste',
          '2 cloves garlic, minced (or 2 teaspoons garlic paste)',
          '1/2 inch piece ginger, grated (or 1 teaspoon ginger paste)',
          '2 cups veggies of choice (I use red pepper and green beans – see notes)',
          'one 14-ounce can coconut milk',
          '1 lb. frozen shrimp, thawed (I like to use jumbo shrimp that are peeled with tails removed)',
          '1 tablespoon fish sauce',
          '1 tablespoon brown sugar',
          'Shallot Crispies',
          'S-',
          '3–4 tablespoons avocado oil',
          '2 shallots, thinly sliced into rings or strips',
          '1/2 cup panko breadcrumbs',
          '1/2 cup chopped cilantro and/or torn Thai basil',
        ],
        steps: ['Make it', 'Eat it', 'Love it'],
        category: 'Thai',
        image: 'thai-shrimp-curry.jpg',
      },
      {
        name: 'Sesame Apricot Tofu',
        description: 'Torn-up tofu pan-fried into crispiness and made saucy, sticky, and sweet into this Sesame Apricot Tofu. An easy, simple vegetarian dinner that is deliciously saving my life!',
        email: 'markains1@gmail.com',
        source: 'https://pinchofyum.com/sesame-apricot-tofu',
        ingredients: [
          'S-Chrispy Tofu:',
          '1 block of extra firm tofu (high protein tofu works really well in this recipe, if you can find it!)',
          '2 tablespoons cornstarch',
          '1 tablespoon soy sauce',
          '2 tablespoons olive oil',
          'S-Apricot Sauce:',
          '1/3 cup apricot preserves',
          '1 tablespoons soy sauce',
          '1–2 tablespoons rice vinegar',
          '1/2 teaspoon each cumin, paprika, and onion powder',
          '1–2 cloves garlic, grated (2 for more garlic flavor, obviously)',
          '1/4 teaspoon salt (more to taste)',
          'S-Extras for Serving:',
          '1 cup rice',
          '12 ounces steamed green beans',
          '1–2 tablespoons toasted sesame oil to taste',
          '1/4 cup chives and/or cilantro for topping',
        ],
        steps: [
          'Cut the tofu block in half horizontally (like a hamburger). If using extra firm high protein tofu, it helps to cut it in half again horizontally. Press the water out of the tofu by wrapping it in paper towels and setting a few heavy books on top of it. Let it stay like that for a few minutes while you prep the sauce.',
          'Whisk the sauce ingredients together. ',
          'Take each piece of tofu and gently pull it into small chunks with your hands (this just gives the tofu pieces a unique shape and texture that holds onto the sauce really well). Place the chunks in a bowl. Toss with soy sauce and a teaspoon or two of olive oil; then sprinkle with cornstarch and give it a few gentle tosses to coat.',
          'Before your start browning your tofu, cook your rice according to package directions and start your green beans! Steam, microwave, sautè – whatever your preferred green bean method is.',
          'In a nonstick skillet over medium high heat, heat the olive oil and then add the cornstarched tofu. Leave it undisturbed for a few minutes on each side, letting it get really nice and brown and crispy – this can take 10-15 minutes. Flip and repeat until the whole batch is browned and crispy.',
          'Finally, add the sauce to the tofu and remove from heat – the pan will still be hot, so it will be sizzly and smell really good from the garlic. The sauce will coat the tofu right away. *heart eyes*',
          'Top with the chives and/or cilantro and sesame oil. Serve with rice and green beans, and finish with more salt and lots of black pepper to taste. The tender crunch of the beans with the steamy rice and sticky tofu! SO good.',
        ],
        category: 'Chinese',
        image: 'sesame-apricot-tofu.jpg',
      },

      {
        name: 'Salmon Tacos With Mango Corn Salsa',
        description: 'Super easy salmon tacos loaded with a mango, sweet corn, and cucumber salsa! Perfect with black beans or avocado tucked into a corn tortilla.',
        email: 'markains1@gmail.com',
        source: 'https://pinchofyum.com/salmon-tacos',
        ingredients: [
          '1 lb. salmon fillet (see notes)',
          '2–3 teaspoons taco seasoning',
          '2 teaspoons avocado oil',
          'S-Mango Corn Salsa:',
          '1 large mango, diced',
          '1 cucumber, diced',
          '2 ears sweet corn, kernels cut off the cob',
          '1/4 cup finely chopped red onion',
          '1/2 cup finely chopped cilantro',
          '1 tablespoon honey',
          'zest and juice of 1 lime',
          '1/2 teaspoon salt',
          'one 14-ounce can refried beans, or regular black beans, or 2 avocados',
          '8 corn tortillas',
          '1/4 cup avocado oil for softening',
        ],
        steps: ['Make it', 'Eat it', 'Love it'],
        category: 'Mexican',
        image: 'salmon-mango-corn-tacos.jpg',
      },

      {
        name: 'Rainbow Vegetarian Pad Thai with Peanuts and Basil',
        description: 'Rainbow Vegetarian Pad Thai with a simple five ingredient Pad Thai sauce – adaptable to any veggies you have on hand! So easy and delicious!',
        email: 'markains1@gmail.com',
        source: 'https://pinchofyum.com/rainbow-vegetarian-pad-thai-with-peanuts-and-basil',
        ingredients: [
          'S-For the Pad Thai',
          '4 ounces brown rice noodles* (you can get stir-fry type noodles or Pad Thai noodles – and usually that’s half a box)',
          '1 zucchini',
          '1 red pepper',
          'half a yellow onion',
          '2 carrots',
          '2 tablespoons oil',
          '1 egg, beaten',
          '1/2 cup peanuts, chopped',
          '1/2 cup fresh herbs like cilantro, green onions, and basil, chopped',
          'S-For the Sauce:',
          '3 tablespoons fish sauce or vegan fish sauce substitute',
          '3 tablespoons brown sugar (or sub another sweetener)',
          '3 tablespoons chicken or vegetable broth',
          '2 tablespoons white vinegar',
          '1 tablespoon soy sauce',
          '1 teaspoon chili paste (sambal oelek)',
        ],
        steps: [
          'Place the uncooked noodles in a bowl of cold water to soak. Spiralize the zucchini, red pepper, and onion into noodle-like shapes. Cut the carrots into very small pieces (or spiralize them, too, if they’re big enough).',
          'Shake up the sauce ingredients in a jar.',
          'Heat a tablespoon of oil over medium high heat. Add the veggies – stir fry with tongs for 2-3 minutes or until tender-crisp (if they are not spiralized, they might need longer). Be careful not to overcook them – they’ll get soggy and heavy. Transfer to a dish and set aside.',
          'Add another tablespoon of oil to the pan. Drain the noodles – they should be softened by now. Add the noodles to the hot pan and stir fry for a minute, using tongs to toss. Add the sauce and stir fry for another minute or two, until the sauce is starting to thicken and stick to the noodles. Push the noodles aside to make a little room for the egg – pour the beaten egg into the pan and let it sit for 30 seconds or so. Toss everything around with the tongs. The egg mixture will stick to the noodles and everything will start getting sticky.',
          'Add in the vegetables, toss together, and remove from heat. Stir in the peanuts and herbs and serve immediately.',
        ],
        category: 'Thai',
        image: 'rainbow-veg-pad-thai.jpg',
      },

      {
        name: 'Bang Bang Salmon with Avocado Cumcumber Salsa',
        description: 'Bang Bang Salmon! Creamy, sweet, savory, and punchy. Served with some steamy rice and an avocado cucumber salsa. Weeknight perfection!',
        email: 'markains1@gmail.com',
        source: 'https://pinchofyum.com/bang-bang-salmon-with-avocado-cucumber-salsa',
        ingredients: [
          'S-Bang Bang Salmon',
          '1 1/2 pounds salmon filet',
          '1–2 tablespoons all-purpose seasoning mix (this is the one I use – see notes for homemade)',
          '1/4 cup mayo',
          '2 tablespoons sweet chili sauce',
          '1 clove garlic, grated',
          '1 teaspoon soy sauce',
          'chili crisp for topping',
          'S-For Serving: ',
          'Cooked rice',
          'Some kind of vegetable – I like a little avocado cucumber salsa which you can find in the notes below!',
        ],
        steps: [
          'Prep the Salmon: Preheat oven to 400 degrees. Cut the salmon into individual portions if you want. Pat the salmon dry. Coat the salmon with the spice mix. Place salmon on a parchment-lined baking sheet.',
          'Make the Bang Bang Sauce: Mix mayo, sweet chili sauce, garlic, and soy sauce in a small bowl. Set half of it aside for after baking.',
          'Bake the Salmon: Spread a small spoonful of sauce over the seasoned salmon pieces. Bake for 10 minutes towards the top of the oven. Then turn the broiler on for another 2-3 minutes, until your salmon looks golden brown and a bit caramelized on top.  ',
          'Serve: Serve the salmon over rice, with a vegetable of choice, and the reserved bang bang sauce + chili crisp drizzled over top! So easy and so good.',
          '',
          'Avocado Cucumber Salsa: I love this salmon with a little sweet and crunchy avocado salsa! Mix 1 avocado (diced), half of a cucumber (diced), a handful of chopped cilantro, a bit of lime juice, a pinch of salt, and a tablespoon of honey in a small bowl. Done! Perfect pretty little green veg for the bowl.',
        ],
        category: 'Thai',
        image: 'bang-bang-salmon.jpg',
      },

      {
        name: 'Caprese Pasta Salad',
        description:
          'This Caprese pasta salad recipe is easy, fresh, and delicious! A perfect summer side dish, it is filled with cherry tomatoes, basil, creamy mozzarella, and a light balsamic vinaigrette. Find make-ahead tips in the blog post above!',
        email: 'markains1@gmail.com',
        source: 'https://www.loveandlemons.com/caprese-pasta-salad/#wprm-recipe-container-84813',
        ingredients: [
          '8 ounces cavatappi pasta',
          '⅓ cup extra-virgin olive oil, plus more for drizzling',
          '2 tablespoons fresh lemon juice',
          '1 tablespoon balsamic vinegar',
          '¼ cup grated pecorino cheese, plus ¼ cup shaved',
          '2 garlic cloves, grated',
          '1 teaspoon sea salt',
          'Freshly ground black pepper',
          '3 cups cherry tomatoes, halved',
          '1 cup mini mozzarella balls, halved',
          '½ cup thinly sliced red onion',
          'Heaping 1 cup fresh basil leaves, torn, plus more for garnish',
        ],
        steps: [
          'Bring a large pot of salted water to a boil. Prepare the pasta according to the package instructions, cooking until slightly past al dente. Drain, toss with a drizzle of olive oil to prevent sticking, and spread on a large plate or baking sheet to cool.',
          'In a large bowl, whisk together the olive oil, lemon juice, balsamic vinegar, grated pecorino, garlic, salt, and several grinds of pepper. Add the cooled pasta and toss to coat, then add the cherry tomatoes, mozzarella, red onion, and basil and toss again. Add the shaved pecorino and gently toss.',
          'Season to taste, garnish with more basil, and serve.',
        ],
        category: 'American',
        image: 'caprese-pasta-salad.jpg',
      },
    ]);
  } catch (error) {
    console.log('Error inserting Recipe Data', +error);
  }
}

insertInitialRecipeData();
End - Turn off Initial Data Insert*/
