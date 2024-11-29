const { _middleware } = require("@src/utils/constants/messages");
const { validateErrors } = require("@src/utils/helpers/express_validator");
const { body, param } = require("express-validator");


/**
 * @param {"add"|"update"|"delete"} type
 */