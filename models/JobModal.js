import mongoose from "mongoose"

const JobSchema = new mongoose.Schema({

    company: {
        type: String,
        required: [true, 'Please provide company'],
        maxlength: 100,
    },

    position: {
        type: String,

        required: [true, 'Please provide position'],
        maxlength: 100,

    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'

    },
    jobLocation: {
        type: String,
        required: true,
        default: 'my city'
    },
    jobType: {
        type: String,
        enum: ['full-time', 'remote', 'internship'],
        default: 'full-time'

    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    },
},
    { timestamps: true }
)
export default mongoose.model('Job', JobSchema)