const express = require('express');
const { register, login, resetPassword, sendResetPage, forgot_password, logout } = require('./Controller');
const { validateErrors } = require('@src/utils/helpers/express_validator');
const { verifyJwtToken } = require('@src/middlewares/jwt');
const { UserValSchema } = require('./validations');
const userRouter = express.Router();


userRouter.post('/register', UserValSchema('register'), register)

userRouter.post('/login', UserValSchema('login'), login)

userRouter.post('/logout', verifyJwtToken, logout)

/* both below routes are not functional right now */
userRouter.post('/forgot-password', UserValSchema('forget-password'), validateErrors, forgot_password)
userRouter.post('/reset/:token', resetPassword);

module.exports = { userRouter }