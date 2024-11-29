const { errorLogger } = require("@config/logger")
const { serviceResponse } = require("./api_response")

/**
 * 
 * @param {any} error 
 * @param {any} res 
 * @param {import("express").NextFunction} next 
 */
exports._handleCatchErrors = async (error, res, next) => {
    errorLogger.error({ message: error.message, stack: error.stack })
    return res.status(500).send(new serviceResponse({ status: 500, errors: [{ message: error.message }] }))
}

