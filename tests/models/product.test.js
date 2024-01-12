import mongoose from 'mongoose';
import { expect } from 'chai';
import Product from '../models/Product';

describe('Product Model', () => {
  beforeEach(async () => {
    await mongoose.connect("mongodb+srv://chandan:zxcvbnm1234567@cluster0.0wqsqlk.mongodb.net/?retryWrites=true&w=majority");
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  
  it('should create a product with variants', async () => {
    const productData = {
      name: 'T-Shirt',
      description: 'A comfortable cotton t-shirt',
      price: 25,
      variants: [
        { name: 'Small', sku: 'TS-S', additionalCost: 0, stockCount: 10 },
        { name: 'Medium', sku: 'TS-M', additionalCost: 2, stockCount: 5 }
      ]
    };

    const product = new Product(productData);
    const savedProduct = await product.save();

    expect(savedProduct.name).to.equal('T-Shirt');
    expect(savedProduct.variants.length).to.equal(2);
    expect(savedProduct.variants[0].name).to.equal('Small');
  });

  
  it('should retrieve a product by ID', async () => {
    const product = await Product.create({ name: 'Test Product' });
    const productId = product._id;

    const retrievedProduct = await Product.findById(productId);

    expect(retrievedProduct).to.exist;
    expect(retrievedProduct.name).to.equal('Test Product');
  });

 
  it('should update a product', async () => {
    const product = await Product.create({ name: 'Initial Name' });
    const productId = product._id;

    const updatedProductData = { name: 'Updated Name' };
    await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });

    const updatedProduct = await Product.findById(productId);
    expect(updatedProduct.name).to.equal('Updated Name');
  });

  it('should delete a product', async () => {
    const product = await Product.create({ name: 'Product to Delete' });
    const productId = product._id;

    await Product.findByIdAndDelete(productId);

    const products = await Product.find();
    expect(products.length).to.equal(0);
  });

  it('should query products by name', async () => {
    await Product.create({ name: 'Product A' });
    await Product.create({ name: 'Product B' });

    const products = await Product.find({ name: 'Product A' });
    expect(products.length).to.equal(1);
    expect(products[0].name).to.equal('Product A');
  });
});
