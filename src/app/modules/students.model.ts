import { Schema, model } from 'mongoose'
import { Guardian, LocalGuardian, Student } from './Students/students.interface'

const nameSchema = new Schema({
  firstName: { type: String, require },
  middleName: { type: String },
  lastName: { type: String, require },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, require },
  fatherContactNo: { type: String, require },
  fatherOccupation: { type: String },
  motherName: { type: String, require },
  motherOccupation: { type: String },
  motherContactNo: { type: String, require },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, require },
  occupation: { type: String },
  contactNo: { type: String, require },
  address: { type: String, require },
})

const studentSchema = new Schema<Student>({
  id: { type: String, require },
  name: nameSchema,
  gender: ['male', 'female'],
  email: { type: String, require },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  emergencyNo: { type: String, require },
  presentAddress: { type: String, require },
  permanentAddress: { type: String, require },
  contactNo: { type: String, require },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: { type: String, require },
})

export const StudentModel = model<Student>('Student', studentSchema)
