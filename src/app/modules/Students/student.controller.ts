import { Request, Response } from 'express'
import { StudentServices } from './student.services'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    const result = await StudentServices.createStudentDB(studentData)

    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentFromDB()
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.getSingleStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'the student data retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
