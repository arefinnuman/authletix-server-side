"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const customer_constant_1 = require("../customer/customer.constant");
const createCustomerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string().optional(),
        customer: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                }),
                middleName: zod_1.z.string().optional(),
            }),
            gender: zod_1.z.enum([...customer_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact number is required',
            }),
            bloodGroup: zod_1.z.enum([...customer_constant_1.bloodGroup]).optional(),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
const createSellerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string().optional(),
        seller: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z
                    .string({
                    required_error: 'First name is required',
                })
                    .nonempty(),
                lastName: zod_1.z
                    .string({
                    required_error: 'Last name is required',
                })
                    .nonempty(),
                middleName: zod_1.z.string().optional(),
            }),
            gender: zod_1.z.enum([...customer_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            dateOfBirth: zod_1.z
                .string({
                required_error: 'Date of birth is required',
            })
                .nonempty(),
            contactNo: zod_1.z
                .string({
                required_error: 'Contact number is required',
            })
                .nonempty(),
            presentAddress: zod_1.z
                .string({
                required_error: 'Present address is required',
            })
                .nonempty(),
            permanentAddress: zod_1.z
                .string({
                required_error: 'Permanent address is required',
            })
                .nonempty(),
            bloodGroup: zod_1.z
                .enum([...customer_constant_1.bloodGroup], {
                required_error: 'Blood group is required',
            })
                .optional(),
            merchantName: zod_1.z
                .string({
                required_error: 'Merchant Name is required',
            })
                .nonempty(),
            merchantLicenseNo: zod_1.z
                .string({
                required_error: 'merchant license is required',
            })
                .nonempty(),
            websiteLink: zod_1.z.string().optional(),
            description: zod_1.z.string().optional(),
        }),
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string().optional(),
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z
                    .string({
                    required_error: 'First name is required',
                })
                    .nonempty(),
                lastName: zod_1.z
                    .string({
                    required_error: 'Last name is required',
                })
                    .nonempty(),
                middleName: zod_1.z.string().optional(),
            }),
            gender: zod_1.z.enum([...customer_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            dateOfBirth: zod_1.z
                .string({
                required_error: 'Date of birth is required',
            })
                .nonempty(),
            contactNo: zod_1.z
                .string({
                required_error: 'Contact number is required',
            })
                .nonempty(),
            presentAddress: zod_1.z
                .string({
                required_error: 'Present address is required',
            })
                .nonempty(),
            permanentAddress: zod_1.z
                .string({
                required_error: 'Permanent address is required',
            })
                .nonempty(),
            bloodGroup: zod_1.z
                .enum([...customer_constant_1.bloodGroup], {
                required_error: 'Blood group is required',
            })
                .optional(),
            managementDepartment: zod_1.z.string().optional(),
            designation: zod_1.z.string({
                required_error: 'designation is required',
            }),
        }),
    }),
});
exports.UserValidation = {
    createCustomerZodSchema,
    createSellerZodSchema,
    createAdminZodSchema,
};
