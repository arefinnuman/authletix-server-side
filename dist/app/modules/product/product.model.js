"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const product_constant_1 = require("./product.constant");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    productPhoto: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        enum: product_constant_1.BrandName,
        required: true,
    },
    availableForDelivery: {
        type: String,
        enum: product_constant_1.deliveryTime,
        required: true,
    },
    label: {
        type: String,
        enum: product_constant_1.label,
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
