import { Schema, model } from 'mongoose'
import {
  StudentMethod,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
} from './Students/students.interface'
import validator, { isAlpha } from 'validator'
import { any, string } from 'joi'
import { Student } from './students.model'
import bcrypt from 'bcrypt'
import config from '../config'

const nameSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    maxlength: [20, 'First name cannot exceed 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const isFirstCharUpperCase =
    //       value.charAt(0) === value.charAt(0).toUpperCase()
    //     const areRemainingCharLowerCase =
    //       value.slice(1) === value.slice(1).toLowerCase()

    //     return isFirstCharUpperCase && areRemainingCharLowerCase
    //   },
    //   message: '{VALUE} is not capitalize.',
    // },
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle name cannot exceed 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    maxlength: [20, 'Last name cannot exceed 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     return validator.isAlpha(value)
    //   },
    //   message: '{VALUE} is not valid',
    // },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  fatherOccupation: { type: String },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: { type: String },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: { type: String },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
})

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],

    maxlength: [20, 'Password not more than 20'],
  },
  name: { type: nameSchema, required: [true, 'Student name is required'] },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not valid email',
    // },
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
    required: [true, 'Blood group is required'],
  },
  emergencyNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
    maxlength: [11, 'Contact number cannot exceed 11 characters'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian details are required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian details are required'],
  },
  profileImage: { type: String, required: [true, 'Profile image is required'] },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'block'],
      message: '{VALUE} is not valid. Please enter either "active" or "block"',
    },
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

// creating Mongoose middle wire

// pre middle ware
studentSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

// post middle ware
studentSchema.post('save', async function (data, next) {
  data.password = ''
  next()
})

// query middle ware
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $eq: false } })
  next()
})

// creating static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// creating interface method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
