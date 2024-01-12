import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  variants: [
    {
      name: { type: String, required: true },
      sku: { type: String, required: true },
      additionalCost: Number,
      stockCount: Number
    }
  ]
});

export default mongoose.model('Product', productSchema);
