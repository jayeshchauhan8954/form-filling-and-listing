// Call Your Routes
const { userRouter } = require("./services/auth/Routes");
const { masterRouter } = require("./services/masters/Routes");
const ExpressApp = require("express")();

/**
 * 
 * @param {ExpressApp} app 
 */
module.exports = (app) => {
    /* Define Your Routes */
    app.use('/user', userRouter)
    app.use('/master', masterRouter)
}