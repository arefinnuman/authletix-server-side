import rateLimit from 'express-rate-limit'

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 Minutes
  max: 50, // Limit each IP to 50 requests per `window` (here, per 5 minutes)
  message: `Too many requests from this Ip, Please try again later`,
})
