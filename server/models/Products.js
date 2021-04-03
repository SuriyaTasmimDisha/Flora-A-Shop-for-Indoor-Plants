const { string, required } = require('@hapi/joi');
const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required:true
    },
    details: {
        type: String,
        require: true
    },
    plantCare: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    }
},{
    timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema)