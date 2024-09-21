import express from 'express';
import mongoose from 'mongoose';
import {imagesUpload} from '../multer';
import auth, {RequestWithUser} from '../middleware/auth';
import {ProductFields} from '../types';
import Product from '../models/Product';

const productsRouter = express.Router();

productsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }

    const productFields: ProductFields = {
      user: req.user._id.toString(),
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      image: req.file ? req.file.filename : null,
    };

    const product = new Product(productFields);
    await product.save();

    return res.send(product);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().populate('category', 'title');
    return res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Product ID is not valid' });
    }

    const product = await Product.findById(req.params.id);

    if (product === null) {
      return res.status(404).send({ error: 'Product not found' });
    }
    return res.send(product);
  } catch (error) {
    next(error);
  }
});

export default productsRouter;