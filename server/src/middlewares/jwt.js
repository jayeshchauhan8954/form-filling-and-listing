const jwt = require('jsonwebtoken');
const { serviceResponse } = require('@src/utils/helpers/api_response');
const { _auth_module, _query } = require('@src/utils/constants/messages');
const { JWT_SECRET_KEY } = require('@config/index');
const { User } = require('@src/models/app/User');
const { _profileStatus, _UserType } = require('@src/utils/constants');
const { _handleCatchErrors } = require('@src/utils/helpers');


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
const verifyJwtToken = function (req, res, next) {
    try {
        let token = req.cookies.token || req.headers.authorization?.split(" ")?.[1];

        if (token) {

            jwt.verify(token, JWT_SECRET_KEY, async function (err, decoded) {
                if (err) {
                    return res.status(403).json(new serviceResponse({ status: 403, errors: _auth_module.unAuth }));
                }
                else {
                    Object.entries(decoded).forEach(([key, value]) => {
                        req[key] = value
                    })
                    next();
                }
            });
        }
        else {
            return res.status(403).send(new serviceResponse({ status: 403, errors: _auth_module.tokenMissing }));
        }
    } catch (error) {
        _handleCatchErrors(error, res)
    }
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const verifyAdmin = async function (req, res, next) {
    try {
        const { userId } = req;
        const user = await User.findOne({ _id: userId, userType: _UserType.Admin, deletedAt: null, status: _profileStatus.Active }).select('_id firstName lastName profilePic email phone role status password');
        if (!user) {
            return res.status(401).json(new serviceResponse({ message: _query.notFound("User") }));
        }

        next()
    } catch (error) {
        _handleCatchErrors(error, res)
    }
};

module.exports = {
    verifyJwtToken,
    verifyAdmin
}