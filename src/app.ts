import cors from 'cors'
import express, { Application } from 'express'

import { notFoundHandler } from './app/middlewares/notFoundHandler'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/routes'

const app: Application = express()

// middleWares
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.get('/', (req, res) => {
  res.send('Hello Cow Lover!')
})

app.use('/api/v1/', router)

// Error Handler
app.use(globalErrorHandler)

app.use(notFoundHandler)

export default app
