import{body,validationResult,param} from 'express-validator'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js'
import { error } from 'console';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationErrors=(validateValues)=>{
    return[validateValues,(req,res,next)=>{
        const errors=validationResult(req);

        if(!errors.isEmpty()){
            const errorMessages=errors.array().map((error)=>error.msg);
            if(errorMessages[0].startsWith('No job')){
                throw new NotFoundError(errorMessages)
            }
            if(errorMessages[0].startsWith('Not authorized')){
              throw new UnauthorizedError(errorMessages)
          }

    
            throw new BadRequestError(errorMessages)
        }

        next()
    }]
}


export const validateJobInput=withValidationErrors([
    body('company').notEmpty().withMessage('company name is required'),
    body('position').notEmpty().withMessage('position name is required'),
    body('jobLocation').notEmpty().withMessage('job Location name is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid job status'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type')

    
])

export const validateParams=withValidationErrors([

    param('id').custom(async(value,{req})=>{
        
     const isValid= mongoose.Types.ObjectId.isValid(value)

     if(!isValid) throw new BadRequestError('invalid mongodb id')

     const job=await Job.findById(value)

     if(!job) throw new NotFoundError(`No job with ${value}`)
     const isAdmin=req.user.role === 'admin'
    const isOwner=req.user.userId===job.createdBy.toString()

    if(!isAdmin && !isOwner){
   throw new UnauthorizedError('Not authorized to access this route')
    }
    })
])

export const ValidateRegisterInput=withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format')
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new BadRequestError('email already exists');
        }
      }),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters long'),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
])


export const ValidateLoginInput=withValidationErrors([
 
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format'),

    body('password')
      .notEmpty()
      .withMessage('password is required')
      
])


export const validateUpdateUserInput=withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
])
