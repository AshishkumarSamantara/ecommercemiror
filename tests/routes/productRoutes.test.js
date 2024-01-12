import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Product Endpoints', () => {
  
  it('should retrieve all products', async () => {
    
    await Product.create({ name: 'Product 1' });
    await Product.create({ name: 'Product 2' });

    const response = await chai.request(app).get('/products');

    expect(response.status).to.equal(200);
    const products = response.body;
    expect(products.length).to.equal(2);
    expect(products[0].name).to.equal('Product 1');
  });

  
  it('should create a new product', async () => {
    const productData = {
      name: 'New Product',
      description: 'A fantastic product',
      price: 19.99
    };

    const response = await chai.request(app).post('/products').send(productData);

    expect(response.status).to.equal(201);
    const createdProduct = response.body;
    expect(createdProduct.name).to.equal(productData.name);
    expect(createdProduct.description).to.equal(productData.description);
    expect(createdProduct.price).to.equal(productData.price);
  });

  
  it('should update an existing product', async () => {
    const product = await Product.create({ name: 'Initial Name' });
    const productId = product._id;

    const updatedProductData = { name: 'Updated Name' };
    const response = await chai.request(app).put(`/products/${productId}`).send(updatedProductData);

    expect(response.status).to.equal(200);
    const updatedProduct = response.body;
    expect(updatedProduct.name).to.equal(updatedProductData.name);
  });

  
  it('should delete a product', async () => {
    const product = await Product.create({ name: 'Product to Delete' });
    const productId = product._id;

    const response = await chai.request(app).delete(`/products/${productId}`);

    expect(response.status).to.equal(200);
    const deletedProduct = response.body;
    expect(deletedProduct.name).to.equal('Product to Delete');

    const products = await Product.find();
    expect(products.length).to.equal(0);
  });
});
