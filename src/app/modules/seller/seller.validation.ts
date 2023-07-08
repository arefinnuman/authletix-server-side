import { z } from 'zod';

const updateSellerZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
    }),

    dateOfBirth: z.string().optional(),

    gender: z.string().optional(),

    bloodGroup: z.string().optional(),

    email: z.string().email().optional(),

    contactNo: z.string().optional(),

    emergencyContactNo: z.string().optional(),

    presentAddress: z.string().optional(),

    permanentAddress: z.string().optional(),

    merchantName: z.string().optional(),

    merchantLicenseNo: z.string().optional(),

    websiteLink: z.string().optional(),

    description: z.string().optional(),

    profileImage: z.string().optional(),
  }),
});

export const SellerValidation = {
  updateSellerZodSchema,
};
