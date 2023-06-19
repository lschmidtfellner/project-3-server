const SalePost = require('../models/CarListing');

// Create a new sale post
async function createSalePost(req, res) {
  try {
    // Retrieve the sale post data from the request body
    const postData = req.body;
    // Create a new SalePost instance using the SalePost model
    const salePost = new SalePost(postData);
    // Save the sale post to the database
    await salePost.save();
    res.status(201).json(salePost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sale post' });
  }
}

// Get a sale post by ID
async function getSalePostById(req, res) {
  try {
    // Retrieve the sale post ID from the request parameters
    const { id } = req.params;
    // Find the sale post in the database by its ID
    const salePost = await SalePost.findById(id);
    if (!salePost) {
      res.status(404).json({ error: 'Sale post not found' });
    } else {
      res.json(salePost);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sale post' });
  }
}

// Get all sale posts
async function getAllSalePosts(req, res) {
  try {
    // Retrieve all sale posts from the database
    const salePosts = await SalePost.find();
    res.json(salePosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sale posts' });
  }
}

// Update a sale post by ID
async function updateSalePost(req, res) {
  try {
    // Retrieve the sale post ID from the request parameters
    const { id } = req.params;
    // Retrieve the updated sale post data from the request body
    const updatedData = req.body;
    // Find the sale post in the database by its ID and update it
    const salePost = await SalePost.findByIdAndUpdate(id, updatedData, { new: true });
    if (!salePost) {
      res.status(404).json({ error: 'Sale post not found' });
    } else {
      res.json(salePost);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sale post' });
  }
}

// Delete a sale post by ID
async function deleteSalePost(req, res) {
  try {
    // Retrieve the sale post ID from the request parameters
    const { id } = req.params;
    // Find the sale post in the database by its ID and remove it
    const salePost = await SalePost.findByIdAndRemove(id);
    if (!salePost) {
      res.status(404).json({ error: 'Sale post not found' });
    } else {
      res.json({ message: 'Sale post deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sale post' });
  }
}

module.exports = {
  createSalePost,
  getSalePostById,
  getAllSalePosts,
  updateSalePost,
  deleteSalePost,
};