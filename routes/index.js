import { Router } from 'express'
import userRouter from './user'

let router = Router()
router.use('/user', userRouter)
export default router
