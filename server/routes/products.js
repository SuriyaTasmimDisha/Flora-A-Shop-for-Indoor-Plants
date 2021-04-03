//Router For Product
const express = require('express');
const router = express.Router();
const plant_data = require('../data.js');
const Product = require('../models/Products');
const {verifyUser} = require('../verifyToken');
const {superAdminAccess} = require('../controller/userAccessController');

//Read Product
router.get('/', async(req, res) => {
    try {
       const data = await Product.find()
        res.send(data);
    } catch (error) {
        res.status(404).send('Not Found!');
    }
    
});

router.get('/seed', async (req, res) => {
    try {
    const createProducts = await Product.insertMany(plant_data.plants);
    res.send({createdProducts: createProducts});
    } catch (error) {
        res.send(error);
    }
});

//Create a New Product
router.post('/', verifyUser, superAdminAccess, async (req, res) => {
try {
//Check if product already exist
const productExist = await Product.findOne({name: req.body.name});
if(productExist) return res.status(400).send('Product already exist'); 

//Add product
const product = new Product({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    price: req.body.price,
    countInStock: req.body.countInStock,
    details: req.body.details,
    plantCare: req.body.plantCare
});

const cratedProduct = await product.save();
res.status(200).send({
    message: 'Product Created',
    product: cratedProduct
});
} catch (error) {
    res.status(400).send(error);
}
});


//Find Product by id
router.get('/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        res.status(200).send(product);
    } catch (error) {
        res.status(404).send('Product Not Found!');
    }
});

//update product info
router.patch('/:id', verifyUser, superAdminAccess, async(req, res) => {
    try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.category = req.body.category;
      product.image = req.body.image;
      product.price = req.body.price;
      product.countInStock = req.body.countInStock;
      product.details = req.body.details;
      product.plantCare = req.body.plantCare;

      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.delete('/:id', verifyUser, superAdminAccess, async(req, res) => {
    try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    }
    } catch (error) {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = router;