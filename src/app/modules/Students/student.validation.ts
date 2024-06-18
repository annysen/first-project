import { z } from 'zod'

// Define Zod schema for name
const NameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20).optional(),
  lastName: z.string().min(1).max(20),
})

// Define Zod schema for guardian details
const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherContactNo: z.string().min(1),
  fatherOccupation: z.string().optional(),
  motherName: z.string().min(1),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().min(1),
})

// Define Zod schema for local guardian details
const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().optional(),
  contactNo: z.string().min(1),
  address: z.string().min(1),
})

// Define Zod schema for student details
const StudentValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().max(20),
  name: NameValidationSchema,
  gender: z.enum(['male', 'female']),
  email: z.string().email(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  emergencyNo: z.string().min(1),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  contactNo: z.string().min(1).max(11),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImage: z.string().min(1),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
})

export default StudentValidationSchema
