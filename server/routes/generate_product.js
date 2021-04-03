const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Product = require('../models/Products');
const {verifyUser} = require('../verifyToken');
const {superAdminAccess} = require('../controller/userAccessController');


let productList = [];

//Fetch product from a API
fetch('https://fakestoreapi.com/products/')
            .then(res=>res.json())
            .then(json=> {
             for(data in json){
                const product = {
                    name: json[data].title,
                    price: json[data].price
                }
                productList.push(product);
            }
        //     for(data in productList) {
        //     console.log(productList[data]);
        //   }
            });


//Generate Product
router.post('/generation', verifyUser, superAdminAccess, async(req, res) => {
try {
//Check if product already exist
const productExist = await Product.findOne({name: req.body.name});
if(productExist) return res.status(400).send('Product already exist');

//Add product
for(data in productList){
const product = new Product({
    name: productList[data].name,
    price: productList[data].price
});

 await product.save();
 productList = [];
}
  res.status(200).send("Product saved");
} catch (error) {
    res.status(400).send(error);
}

});

module.exports = router;            