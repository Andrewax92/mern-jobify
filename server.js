import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import dotenv from 'dotenv'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import helmet from 'helmet'

import mongoSanitize from 'express-mongo-sanitize'

// db and authenticateUser
import connectDB from './db/conect.js'

// routes
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
dotenv.config()
const app = express()

// middleware
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(express.json())
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './my_jobo_mania/build')))

app.use(express.json())
app.use(helmet())
app.use(mongoSanitize())


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/job', authenticateUser, jobsRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './my_jobo_mania/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}..`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()