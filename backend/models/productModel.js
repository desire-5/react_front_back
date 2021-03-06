import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;
