// src/schemas/combinedSchema.ts
import { z } from 'zod'

// Define the password schema
const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters.' })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter.'
  })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter.'
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'Password must contain at least one special character.'
  })

// Define the form schema
const formSchema = z
  .object({
    username: z.string().min(4, {
      message: 'Username must be at least 4 characters.'
    }),
    email: z.string().email({
      message: 'Invalid email address.'
    }),
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

const loginSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  password: passwordSchema
})

export { loginSchema, passwordSchema, formSchema }
