"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = exports.CustomerSchema = void 0;
const mongoose_1 = require("mongoose");
const customer_constant_1 = require("./customer.constant");
exports.CustomerSchema = new mongoose_1.Schema({
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
            middleName: {
                type: String,
                required: false,
            },
        },
        required: true,
    },
    gender: {
        type: String,
        enum: customer_constant_1.gender,
    },
    dateOfBirth: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    contactNo: {
        type: String,
        unique: true,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: customer_constant_1.bloodGroup,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
    },
    profileImage: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Customer = (0, mongoose_1.model)('Customer', exports.CustomerSchema);
