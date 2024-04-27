import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getJob,showStats,updateJob } from "../controllers/JobController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
import { validateJobInput, validateParams } from "../middleware/validationMiddleware.js";



const router=Router()

router.route('/').get(getAllJobs).post(checkForTestUser,validateJobInput,createJob)

router.route('/stats').get(showStats)
router.route('/:id').get(validateParams,getJob).patch(checkForTestUser,validateParams,validateJobInput,updateJob).delete(checkForTestUser,validateParams,deleteJob)

export default router