import Joi from 'joi'

// Define validation schema for names
const validationNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .messages({
      'string.base': 'First name should be a type of string',
      'string.empty': 'First name is required',
      'string.max': 'First name cannot exceed 20 characters',
      'string.pattern.base': 'First name must be capitalized',
    }),
  middleName: Joi.string().trim().max(20).optional().messages({
    'string.base': 'Middle name should be a type of string',
    'string.max': 'Middle name cannot exceed 20 characters',
  }),
  lastName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .messages({
      'string.base': 'Last name should be a type of string',
      'string.empty': 'Last name is required',
      'string.max': 'Last name cannot exceed 20 characters',
      'string.pattern.base':
        'Last name must be capitalized and contain only alphabetic characters',
    }),
})

// Define validation schema for guardian details
const validationGuardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': "Father's name should be a type of string",
    'string.empty': "Father's name is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': "Father's contact number should be a type of string",
    'string.empty': "Father's contact number is required",
  }),
  fatherOccupation: Joi.string().optional().messages({
    'string.base': "Father's occupation should be a type of string",
  }),
  motherName: Joi.string().required().messages({
    'string.base': "Mother's name should be a type of string",
    'string.empty': "Mother's name is required",
  }),
  motherOccupation: Joi.string().optional().messages({
    'string.base': "Mother's occupation should be a type of string",
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': "Mother's contact number should be a type of string",
    'string.empty': "Mother's contact number is required",
  }),
})

// Define validation schema for local guardian details
const validationLocalGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': "Local guardian's name should be a type of string",
    'string.empty': "Local guardian's name is required",
  }),
  occupation: Joi.string().optional().messages({
    'string.base': "Local guardian's occupation should be a type of string",
  }),
  contactNo: Joi.string().required().messages({
    'string.base': "Local guardian's contact number should be a type of string",
    'string.empty': "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    'string.base': "Local guardian's address should be a type of string",
    'string.empty': "Local guardian's address is required",
  }),
})

// Define validation schema for student details
const validationStudentSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'Student ID should be a type of string',
    'string.empty': 'Student ID is required',
  }),
  name: validationNameSchema.required().messages({
    'object.base': 'Student name should be an object',
    'any.required': 'Student name is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'string.base': 'Gender should be a type of string',
    'string.empty': 'Gender is required',
    'any.only': '{#value} is not a valid gender',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a type of string',
    'string.empty': 'Email is required',
    'string.email': '{#value} is not a valid email',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required()
    .messages({
      'string.base': 'Blood group should be a type of string',
      'string.empty': 'Blood group is required',
      'any.only': '{#value} is not a valid blood group',
    }),
  emergencyNo: Joi.string().required().messages({
    'string.base': 'Emergency contact number should be a type of string',
    'string.empty': 'Emergency contact number is required',
  }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present address should be a type of string',
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent address should be a type of string',
    'string.empty': 'Permanent address is required',
  }),
  contactNo: Joi.string().max(11).required().messages({
    'string.base': 'Contact number should be a type of string',
    'string.empty': 'Contact number is required',
    'string.max': 'Contact number cannot exceed 11 characters',
  }),
  guardian: validationGuardianSchema.required().messages({
    'object.base': 'Guardian details should be an object',
    'any.required': 'Guardian details are required',
  }),
  localGuardian: validationLocalGuardianSchema.required().messages({
    'object.base': 'Local guardian details should be an object',
    'any.required': 'Local guardian details are required',
  }),
  profileImage: Joi.string().required().messages({
    'string.base': 'Profile image should be a type of string',
    'string.empty': 'Profile image is required',
  }),
  isActive: Joi.string().valid('active', 'block').default('active').messages({
    'string.base': 'Status should be a type of string',
    'any.only':
      '{#value} is not valid. Please enter either "active" or "block"',
  }),
})

export default validationStudentSchema
