import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Create a product
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a product (including variants)
router.put('/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) {
        res.status(404).json({
   
  message: 'Product not found' });
        return;
      }
      res.json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a product
  router.delete('/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Add a variant to a product
  router.post('/products/:productId/variants', async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      product.variants.push(req.body);
      await product.save();
      res.json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Update a variant
  router.put('/products/:productId/variants/:variantId', async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      const variantIndex = product.variants.findIndex(variant => variant._id === req.params.variantId);
      if (variantIndex === -1) {
        res.status(404).json({ message: 'Variant not found' });
        return;
      }
      product.variants[variantIndex] = req.body;
      await product.save();
      res.json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a variant
  router.delete('/products/:productId/variants/:variantId', async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      const variantIndex = product.variants.findIndex(variant => variant._id === req.params.variantId);
      if (variantIndex === -1) {
        res.status(404).json({ message: 'Variant not found' });
        return;
      }
      product.variants.splice(variantIndex, 1);
      await product.save();
      res.json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Search products
  router.get('/products/search', async (req, res) => {
    try {
      const { term } = req.query; 
  
      const query = {
        $or: [
          { name: { $regex: new RegExp(term, 'i') } }, 
          { description: { $regex: new RegExp(term, 'i') } }, 
          { 'variants.name': { $regex: new RegExp(term, 'i') } } 
        ]
      };
  
      const products = await Product.find(query);
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching products' });
    }
  });
  
  export default router;
  


