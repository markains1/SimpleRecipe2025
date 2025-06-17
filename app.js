const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000; // Can get port from env, but defaults to 3000

require('dotenv').config(); // See Additional Raddy video on this...

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // public folder for static content, images & such
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

app.listen(port, () => console.log(`Listening to port ${port}`)); // Using  Arrow Function
