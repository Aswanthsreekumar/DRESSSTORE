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

// Here you will define other routes for your CRUD operations...

// The server is set to listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// ... other required modules
const productRoutes = require('./routes/product.routes');

// ... after app has been created and other middleware set
app.use('/api/products', productRoutes);

// ... after your routes and other middleware

// Global error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});
