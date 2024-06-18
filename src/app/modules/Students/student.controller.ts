import { Request, Response } from 'express'
import { StudentServices } from './student.services'
import Joi from 'joi'
import validationStudentSchea from './student.joi.validation'
import StudentValidationSchema from './student.validation'
import { error } from 'console'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    // using joi  send value  to validationStudentSchema
    // const { error, value } = validationStudentSchema.validate(value)

    // this is for joi
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something is wrong',
    //     data: error.details,
    //   })
    // }

    // using zod  for validation
    const zodParseData = StudentValidationSchema.parse(studentData)

    const result = await StudentServices.createStudentDB(zodParseData)
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      error: err,
    })
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      error: err,
    })
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      error: err,
    })
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student data deleted',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      error: err,
    })
  }
}

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
