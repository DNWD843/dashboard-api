import express from 'express'
import {routes} from "../constants/index.mjs";

const usersRouter = express.Router()

usersRouter.use((req, res, next) => {
    console.log('Handle "/users" route')
    next()
})

usersRouter.post(routes.LOGIN, (req, res) => {
    res.send('Logged in')
})

usersRouter.post(routes.REGISTER, (req, res) => {
    res.send('Registered')
})

export { usersRouter }
