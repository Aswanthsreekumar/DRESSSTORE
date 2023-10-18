const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an instance of an Express server
const app = express();
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON bodies

// Import models
const Product = require('./product.model');
const Category = require('./category.model');

// MongoDB URI
const dbURI = 'mongodb://localhost:27017/DressStore';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected...');

    // Call the createCategories function after a successful connection
    createCategories();
  })
  .catch(err => console.log(err));

// Function to create default categories
function createCategories() {
  // Categories to be inserted
  const categories = ['Men', 'Women', 'Teens'].map(cat => ({ name: cat }));

  // Insert categories
  Category.insertMany(categories, { ordered: false })
    .then(() => console.log('Categories created!'))
    .catch(err => {
      if (err.code !== 11000) { // Ignore duplicate key errors (code 11000)
        console.error('Error while creating categories:', err);
      }
    });
}

// Define a route to ensure everything is set up properly
app.get('/', (req, res) => {
  res.send('{"message":"Welcome to DressStore application"}');
});

// Define routes for CRUD operations on products
const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

// Define routes for CRUD operations on categories
const categoryRoutes = require('./routes/category.routes');
app.use('/api/categories', categoryRoutes);

// The server is set to listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});
