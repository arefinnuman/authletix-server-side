import cors from 'cors'
import express, { Application } from 'express'
import { limiter } from './app/config/ratelimiter'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import userRouter from './app/modules/users/users.routes'

const app: Application = express()

// middlewares
app.use(cors())
app.use(limiter)

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Error Handler
app.use(globalErrorHandler)

// Application Routes
app.use('/api/v1/users/', userRouter)

export default app
