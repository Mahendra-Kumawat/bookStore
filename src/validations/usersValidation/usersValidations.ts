import { z } from "zod";

// Schema definition
export const userRegisterSchema = z
    .object({
        name: z
            .string({
                message: "Name is required",
            })
            .min(2, "Name must be at least 2 characters long"),
        email: z
            .string({
                message: "Email is required",
            })
            .email("Invalid email address"),
        password: z
            .string({
                message: "Password is required",
            })
            .min(6, "Password must be at least 6 characters long"),
        confirmPassword: z
            .string({
                message: "Confirm Password is required",
            })
            .min(6, "Password must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// Correct way to infer the schema type
export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
