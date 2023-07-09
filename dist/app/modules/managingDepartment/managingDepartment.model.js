"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagingDepartment = void 0;
const mongoose_1 = require("mongoose");
const ManagingDepartmentSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ManagingDepartment = (0, mongoose_1.model)('ManagingDepartment', ManagingDepartmentSchema);
