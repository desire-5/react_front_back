import express from 'express';
import Product from '../models/productModel';

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New product created', data: newProduct });
    }
    return res.status(500).send({ message: 'Error in creating product' });
});

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById({ _id: productId });
    if (product) {
        return res.send(product);
    }
    return res.status(404).send({ message: 'Error in updating product' });
});

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).send({ message: 'Product updated', data: updatedProduct });
        }
    }
    return res.status(500).send({ message: 'Error in updating product' });
});
router.delete('/:id', async (req, res) => {
    console.log('del', req.params.id);
    const productId = req.params.id;
    const del = await Product.findById(productId);
    if (del) {
        await del.remove();
        return res.send({ message: 'Product deleted', data: del });
    }
    return res.send({ message: 'Error in deleting product' });
});
export default router;
