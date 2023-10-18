const Category = require('../category.model');

// Function to fetch all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Function to create a new category
exports.createCategory = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({ message: "Category name can't be empty" });
    }

    // Create a Category
    const category = new Category({
        name: req.body.name,
    });

    // Save Category in the database
    try {
        const data = await category.save();
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Other necessary functions like update, delete, get one category, etc.
