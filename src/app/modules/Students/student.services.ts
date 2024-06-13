import { Student } from './students.interface'
import { StudentModel } from '../students.model'

const createStudentDB = async (student: Student) => {
  const result = await StudentModel.create(student)
  return result
}

const getStudentFromDB = async () => {
  const result = await StudentModel.find()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
  return result
}

export const StudentServices = {
  createStudentDB,
  getStudentFromDB,
  getSingleStudentFromDB,
}
