// import { Schema, model, connect } from 'mongoose'

import { Model } from 'mongoose'
import { Student } from './../students.model'

export type TGuardian = {
  fatherName: string
  fatherOccupation?: string
  fatherContactNo: string
  motherName: string
  motherOccupation?: string
  motherContactNo: string
}

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TLocalGuardian = {
  name: string
  occupation?: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  password: string
  name: TUserName
  gender: 'male' | 'female'
  email: string
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  emergencyNo: string
  presentAddress: string
  permanentAddress: string
  contactNo?: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImage?: string
  isActive: 'active' | 'blocked'
  isDeleted: boolean
}

// creating static method
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}

// creating interface method
// export type StudentMethod = {
//   isUserExist(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, {}, StudentMethod>
