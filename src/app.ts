import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import { limiter } from './app/config/ratelimiter'
import ApiError from './app/errors/ApiError'
import globalErrorHandler from './app/modules/middlewares/globalErrorHandler'
import { UserRouter } from './app/modules/users/user.routes'

const app: Application = express()

// middlewares
app.use(cors())
app.use(limiter)

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users/', UserRouter)

// Error Handler
app.use(globalErrorHandler)

// Testing Routes
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  throw new ApiError(400, `Ore Baba Error`)
})

export default app
