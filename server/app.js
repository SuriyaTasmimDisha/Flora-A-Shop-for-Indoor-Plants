const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

dotenv.config();
const mongoDB = process.env.DB_CONNECT;

//Connect To MongoDB
mongoose.connect(mongoDB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false 
}, () => {
  console.log("Connected to DB");
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Import Routes
const user_authRouter = require('./routes/user_auth');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/order');
const generateProductRouter = require('./routes/generate_product');
const uploadImageRouter = require('./routes/uploadImage');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Route Middlewares
app.use('/users', user_authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/products', generateProductRouter);
app.use('/uploads', uploadImageRouter);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: `Can't find ${req.originalUrl} on this server.`
  });
});

module.exports = app;
