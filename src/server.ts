import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
import { logger } from './app/config/logger'

const usingPort = config.port
const dataBaseUrl = config.database_url as string

async function bootstrap() {
  try {
    await mongoose.connect(dataBaseUrl)
    logger.info(`DataBase Connected`)

    app.listen(usingPort, () => {
      logger.info(`EasyBuy Server on port ${usingPort}`)
    })
  } catch (err) {
    logger.error(`Failed to connect`, err)
  }
}

bootstrap()
