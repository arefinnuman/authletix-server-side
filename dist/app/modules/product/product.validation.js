'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductValidation = void 0;
const zod_1 = require('zod');
const product_constant_1 = require('./product.constant');
const createProductZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string().min(3).max(255),
    price: zod_1.z.number().min(0),
    description: zod_1.z.string().min(3).max(255),
    productPhoto: zod_1.z.string().optional(),
    brand: zod_1.z.enum([...product_constant_1.BrandName]),
    availableForDelivery: zod_1.z.enum([...product_constant_1.deliveryTime]),
    label: zod_1.z.enum([...product_constant_1.label]).optional(),
    category: zod_1.z.string(),
    seller: zod_1.z.string(),
  }),
});
const updateProductZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string().min(3).max(255).optional(),
    price: zod_1.z.number().min(0).optional(),
    description: zod_1.z.string().min(3).max(255).optional(),
    productPhoto: zod_1.z.string().optional(),
    brand: zod_1.z.enum([...product_constant_1.BrandName]).optional(),
    availableForDelivery: zod_1.z
      .enum([...product_constant_1.deliveryTime])
      .optional(),
    label: zod_1.z.enum([...product_constant_1.label]).optional(),
    category: zod_1.z.string().optional(),
    seller: zod_1.z.string().optional(),
  }),
});
exports.ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
