import { z } from 'zod';

const createManagingDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: `Year is required`,
    }),
  }),
});

const updateManagingDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: `Year is required`,
      })
      .optional(),
  }),
});

export const ManagingDepartmentValidation = {
  createManagingDepartmentZodSchema,
  updateManagingDepartmentZodSchema,
};
