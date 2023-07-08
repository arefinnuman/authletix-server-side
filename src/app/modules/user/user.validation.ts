import { z } from 'zod';
import { bloodGroup, gender } from '../customer/customer.constant';

const createCustomerZodSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string().optional(),
    customer: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),

      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),

      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),

      contactNo: z.string({
        required_error: 'Contact number is required',
      }),

      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),

      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),

      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),

      profileImage: z.string().optional(),
    }),
  }),
});

const createSellerZodSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string().optional(),

    seller: z.object({
      name: z.object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .nonempty(),

        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .nonempty(),

        middleName: z.string().optional(),
      }),

      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),

      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
        })
        .nonempty(),

      contactNo: z
        .string({
          required_error: 'Contact number is required',
        })
        .nonempty(),

      presentAddress: z
        .string({
          required_error: 'Present address is required',
        })
        .nonempty(),

      permanentAddress: z
        .string({
          required_error: 'Permanent address is required',
        })
        .nonempty(),

      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is required',
        })
        .optional(),

      merchantName: z
        .string({
          required_error: 'Merchant Name is required',
        })
        .nonempty(),

      merchantLicenseNo: z
        .string({
          required_error: 'merchant license is required',
        })
        .nonempty(),

      websiteLink: z.string().optional(),

      description: z.string().optional(),
    }),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string().optional(),

    admin: z.object({
      name: z.object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .nonempty(),

        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .nonempty(),

        middleName: z.string().optional(),
      }),

      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),

      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
        })
        .nonempty(),

      contactNo: z
        .string({
          required_error: 'Contact number is required',
        })
        .nonempty(),

      presentAddress: z
        .string({
          required_error: 'Present address is required',
        })
        .nonempty(),

      permanentAddress: z
        .string({
          required_error: 'Permanent address is required',
        })
        .nonempty(),

      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is required',
        })
        .optional(),

      managementDepartment: z.string().optional(),

      designation: z.string({
        required_error: 'designation is required',
      }),
    }),
  }),
});

export const UserValidation = {
  createCustomerZodSchema,
  createSellerZodSchema,
  createAdminZodSchema,
};
