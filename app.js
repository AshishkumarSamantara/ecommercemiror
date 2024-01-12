import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectUsingMongoose from './config/mongoose.js'
import productRoutes from './routes/productRoutes.js';


const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.listen(8000, () => {
     connectUsingMongoose();
})