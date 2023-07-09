"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = exports.SellerSchema = void 0;
const mongoose_1 = require("mongoose");
const seller_constant_1 = require("./seller.constant");
exports.SellerSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            middleName: String,
        },
        required: true,
    },
    gender: {
        type: String,
        enum: seller_constant_1.gender,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: seller_constant_1.bloodGroup,
    },
    merchantName: {
        type: String,
        required: true,
    },
    merchantLicenseNo: {
        type: String,
        required: true,
    },
    websiteLink: {
        type: String,
    },
    description: {
        type: String,
    },
    balance: {
        type: Number,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Seller = (0, mongoose_1.model)('Seller', exports.SellerSchema);
