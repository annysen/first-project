import { Schema, model, connect } from 'mongoose'

export type Guardian = {
  fatherName: string
  fatherOccupation?: string
  fatherContactNo: string
  motherName: string
  motherOccupation?: string
  motherContactNo: string
}

export type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type LocalGuardian = {
  name: string
  occupation?: string
  contactNo: string
  address: string
}

export type Student = {
  id: string
  name: UserName
  gender: 'male' | 'female'
  email: string
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  emergencyNo: string
  presentAddress: string
  permanentAddress: string
  contactNo?: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImage?: string
  isActive: 'active' | 'blocked'
}
