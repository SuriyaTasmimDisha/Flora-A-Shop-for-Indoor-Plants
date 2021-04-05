const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Products');
const {verifyUser} = require('../verifyToken');
const {superAdminAccess, adminAccess, currentUser} = require('../controller/userAccessController');

//Make an order for product
router.post('/', verifyUser, currentUser, async(req, res, next) => {
try {
  //Save order to db
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
      } else {
        const order = new Order({
          orderItems: req.body.orderItems,
          shippingAddress: req.body.shippingAddress,
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.itemsPrice,
          shippingPrice: req.body.shippingPrice,
          totalPrice: req.body.totalPrice,
          user: req.body.userId,
        });
        const createdOrder = await order.save();
        res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
      }
    } catch (error) {
    res.status(404).send(error);
  }
});

//Super Admin: Get full order-list
router.get('/', verifyUser, superAdminAccess, async(req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name'); 
    res.status(200).send(orders);
  } catch (error) {
    res.status(404).send('Not Found');
  }
});
//Admin: Get full order-list
router.get('/admin', verifyUser, adminAccess, async(req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name'); 
    res.status(200).send(orders);
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

//Get order list of a particular user by user id
router.get('/mine', verifyUser, currentUser, async(req, res) => {
  try {
  const orders = await Order.find({user: req.body.userId});
      res.status(200).send(orders);
  } catch (error) {
    res.status(404).send('Order List Not found!.');
  }
});

//Show a particular order
router.get('/:orderId', verifyUser, async(req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId); 
    res.status(200).send(order);
  } catch (error) {
    res.status(404).send('Order Not Found');
  }
});

//Delete order
router.delete('/:id', verifyUser, superAdminAccess, async(req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    }
  } catch (error) {
    res.status(404).send({ message: 'Order Not Found' });
  }
});

//Admin: Get pending order list
router.get('/admin/:status', verifyUser, adminAccess, async(req, res) => {
  try {
    const status = req.params.status;
    const data = await Order.find({status: status});
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(`${status} list not found!`);
  }
});

//Super Admin: Change Order Status
router.patch('/:orderId', verifyUser, superAdminAccess, async(req, res) => {
  try {
  const order = await Order.findById(req.params.orderId);
        order.status = req.body.status;

  const updatedOrder = await order.save();
  res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send('Order not found.');
  }
});

//Admin: Change Order Status
router.patch('/admin/:orderId', verifyUser, adminAccess, async(req, res) => {
  try {
  const order = await Order.findById(req.params.orderId);
        order.status = req.body.status;

  const updatedOrder = await order.save();
  res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send('Order not found.');
  }
});

//Super Admin: Get Order list of todays' 
//*Faced problem of casting error. solved by pasting this block befor /order-list/:id *
router.get('/today', verifyUser, superAdminAccess, async(req, res) => { 
  try {
    const currentDate = new Date();
   currentDate.setHours(0,0,0,0);

   const nextDate = new Date();
   nextDate.setHours(23,59,59,999);

   const data = await Order.find({
    date: {
      $gte: currentDate,
      $lt: nextDate
    }
   });
   const count = data.length;
   res.status(200).json({
     Total_order: count,
     data: data
   });
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

//Super Admin: Get order list of a particular user by user id
router.get('/:userId', verifyUser, superAdminAccess, async(req, res) => {
  try {
  const userId = req.params.userId;
  const data = await Order.findOne({userId: userId});
      res.status(200).json({
      UserId: data.userId,
      product: data.product,
      quantity: data.quantity
    });
  } catch (error) {
    res.status(404).send('No order found!.');
  }
});


module.exports = router;