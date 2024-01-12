import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import Product from '../models/Product';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Search Functionality', () => {
  
  it('should search products by name', async () => {
    await Product.create({ name: 'Product A' });
    await Product.create({ name: 'Product B' });

    const response = await chai.request(app).get('/products/search?term=Product A');

    expect(response.status).to.equal(200);
    const products = response.body;
    expect(products.length).to.equal(1);
    expect(products[0].name).to.equal('Product A');
  });

  
  it('should search products by description', async () => {
    await Product.create({ name: 'Random Product', description: 'This is a test product' });
    await Product.create({ name: 'Another Product', description: 'This is a different product' });

    const response = await chai.request(app).get('/products/search?term=test');

    expect(response.status).to.equal(200);
    const products = response.body;
    expect(products.length).to.equal(1);
    expect(products[0].description).to.include('test');
  });

  it('should search products by multiple criteria', async () => {
    await Product.create({ name: 'Blue Shirt', description: 'A comfortable blue shirt', price: 20 });
    await Product.create({ name: 'Red Shirt', description: 'A stylish red shirt', price: 30 });

    const response = await chai.request(app).get('/products/search?term=shirt&price=20');

    expect(response.status).to.equal(200);
    const products = response.body;
    expect(products.length).to.equal(1);
    expect(products[0].name).to.include('Blue');
    expect(products[0].price).to.equal(20);
  });
});
