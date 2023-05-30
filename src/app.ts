import cors from 'cors'
import express, { Application } from 'express'
import userRouter from './app/modules/users/users.routes'

const app: Application = express()

// middlewares
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users/', userRouter)

export default app
