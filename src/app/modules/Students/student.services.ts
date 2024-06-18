import { TStudent } from './students.interface'
import { Student as Student } from '../students.model'

const createStudentDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exist from static')
  }
  const result = await Student.create(studentData)

  // const student = new Student(studentData)
  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('User already exist')
  // }
  // const result = await student.save()
  return result
}

const getStudentFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  createStudentDB,
  getStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
