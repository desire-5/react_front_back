import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import data from './data';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
    .connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .catch(error => console.log(error.reason));

const app = express();

// app.use(cors());
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000'],
        optionsSuccessStatus: 200,
    })
);
app.use(bodyParser.json());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

// get from data.js
// app.get('/api/products/:id', (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x => x._id === productId);
//     if (product) res.send(product);
//     else res.status(404).send({ msq: 'Product Not Found!' });
// });

// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// });

app.listen(config.PORT, () => {
    console.log('Server started at http://localhost:5000');
});
