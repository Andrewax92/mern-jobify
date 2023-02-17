import Job from '../models/JobModal.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/error.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'
const createJob = async (req, res) => {
    const { position, company } = req.body
    if (!position || !company) {
        throw new BadRequestError('Please provide all values')
    }
    // console.log(req.body, req.user);
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
const deleteJob = async (req, res) => {
    const { id: jobId } = req.params
    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new NotFoundError("no job with such id")
    }

    checkPermissions(req.user, job.createdBy)

    await job.remove()

    res.status(StatusCodes.OK).json({ msg: 'Succcses! Job remove' })


}

const getAllJobs = async (req, res) => {
    const { status, jobType, sort, search, } = req.query

    const queryObject = {
        createdBy: req.user.userId
    }
    // Add stuff based on condition
    if (status && status !== 'all') {
        queryObject.status = status
    }
    // Based on JobType
    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType
    }

    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }
    }
    // No await
    let result = Job.find(queryObject)


    // chain sort condisions
    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }
    if (sort === 'a-z') {
        result = result.sort('position')
    }
    if (sort === 'z-a') {
        result = result.sort('-position')
    }
    // setup pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    const jobs = await result

    const totalJobs = await Job.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalJobs / limit)
    res
        .status(StatusCodes.OK)
        .json({ jobs, totalJobs, numOfPages })
    // console.log(jobs);


}
const updateJob = async (req, res) => {
    const { id: jobId } = req.params

    const { company, position } = req.body
    if (!company || !position) {
        throw new BadRequestError('Please Provide All Values')
    }
    const job = await Job.findOne({ _id: jobId })

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    // console.log(typeof req.user.userId);
    // console.log(typeof job.createdBy);

    checkPermissions(req.user, job.createdBy)
    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, { new: true, runValidators: true })

    res.status(StatusCodes.OK).json({ updatedJob })
}
const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ])
    stats = stats.reduce((acc, currItem) => {
        const { _id: title, count } = currItem
        acc[title] = count
        return acc
    }, {})
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }
    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 }
    ])
    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: { year, month }, count } = item
        const date = moment().month(month).year(year).format('MMM Y')
        return { date, count }
    }).reverse()
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}





export { createJob, deleteJob, getAllJobs, updateJob, showStats }