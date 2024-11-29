const { _middleware } = require("@src/utils/constants/messages");
const { validateErrors } = require("@src/utils/helpers/express_validator");
const { body, param, oneOf } = require("express-validator");


/**
 * @param {"login"|"register"|"logout"|"forget-password"} type
 */
exports.UserValSchema = (type) => {
    switch (type) {
        case "register":
            return [
                body('userName', "user name can't be null").notEmpty().isString().not().trim(),
                body('email', "email can't be null").notEmpty().isEmail().not().withMessage("email is not in valid format").trim(),
                body('password', "password can't be null").notEmpty().trim(),
                validateErrors
            ]
        case "login":
            return [
                oneOf([
                    body('email', "email can't be null").notEmpty().trim(),
                    body('userName', "userName can't be null").notEmpty().not().withMessage("User name is not in valid ").trim(),
                ]),
                body('password', "password can't be null").notEmpty().trim(),
                validateErrors
            ]
        case "forget-password":
            return [
                body('email', "email can't be null").notEmpty().isEmail().not().withMessage("email is not in valid format").trim(),
            ]
    }
}