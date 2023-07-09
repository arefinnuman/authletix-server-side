"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DuplicateKeyError = (error) => {
    const duplicateField = Object.keys(error.keyValue)[0];
    const errorMessage = `${duplicateField} already exists`;
    const statusCode = 409;
    return {
        statusCode,
        message: 'E11000 duplicate key error collection',
        errorMessages: [
            {
                path: duplicateField,
                message: errorMessage,
            },
        ],
    };
};
exports.default = DuplicateKeyError;
