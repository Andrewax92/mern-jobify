import express from 'express'


const router = express.Router()
import {
    createJob,
    deleteJob,
    getAllJobs,
    updateJob,
    showStats
} from '../controllers/jobController.js'

router.route('/').post(createJob).get(getAllJobs)
//  :id shoud be the last in the routes 
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)


export default router