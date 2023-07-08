import { z } from 'zod';
import { BrandName, deliveryTime, label } from './product.constant';

const createProductZodSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(255),
    price: z.number().min(0),
    description: z.string().min(3).max(255),
    productPhoto: z.string().optional(),
    brand: z.enum([...BrandName] as [string, ...string[]]),
    availableForDelivery: z.enum([...deliveryTime] as [string, ...string[]]),
    label: z.enum([...label] as [string, ...string[]]),
    category: z.string(),
    seller: z.string(),
  }),
});

const updateProductZodSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(255).optional(),
    price: z.number().min(0).optional(),
    description: z.string().min(3).max(255).optional(),
    productPhoto: z.string().optional(),
    brand: z.enum([...BrandName] as [string, ...string[]]).optional(),
    availableForDelivery: z
      .enum([...deliveryTime] as [string, ...string[]])
      .optional(),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    category: z.string().optional(),
    seller: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
