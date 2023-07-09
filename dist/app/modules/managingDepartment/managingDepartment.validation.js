'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManagingDepartmentValidation = void 0;
const zod_1 = require('zod');
const createManagingDepartmentZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: `Year is required`,
    }),
  }),
});
const updateManagingDepartmentZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z
      .string({
        required_error: `Year is required`,
      })
      .optional(),
  }),
});
exports.ManagingDepartmentValidation = {
  createManagingDepartmentZodSchema,
  updateManagingDepartmentZodSchema,
};
