const { User } = require("@src/models/app/User");
const { _status, } = require("@src/utils/constants");
const { _query, _auth_module, _response_message } = require("@src/utils/constants/messages");
const { _handleCatchErrors } = require("@src/utils/helpers");
const { serviceResponse } = require("@src/utils/helpers/api_response");
const { generateJwtToken } = require("@src/utils/helpers/jwt");
const bcrypt = require('bcryptjs');

// user register controller 

module.exports.register = async (req, res) => {
    // #swagger.tags = ['user auth']
    try {

        const { userName, email, password, userType = 1 } = req.body;

        const existingUser = await User.findOne({ $or: [{ userName }, { email }], deletedAt: null });
        if (existingUser) {
            return res.status(403).send(new serviceResponse({ status: 403, errors: [{ message: _response_message.allReadyExist("userName or email") }] }))
        }

        const newUser = new User({
            userName,
            email,
            password,
            userType
        });
        await newUser.save();
        res.status(201).send(new serviceResponse({ status: 201, data: newUser, message: 'User registered successfully' }))
    } catch (error) {
        _handleCatchErrors(error, res)
    }
}

// login controller 

module.exports.login = async (req, res) => {
    // #swagger.tags = ['user auth']
    try {
        const { email, userName, password } = req.body;
        const user = await User.findOne({ $or: [{ userName }, { email }], status: _status.Active, deletedAt: null });
        if (!user) {
            return res.status(401).json({ message: _query.notFound("User") });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send(new serviceResponse({ status: 400, errors: [{ message: _query.invalid("Credentials") }] }))
        }
        delete user._doc.password
        delete user._doc.updatedAt

        user._doc.userId = user?._doc._id
        const token = generateJwtToken(user._doc)
        user._doc.token = token
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 84000, });

        res.status(200).send(new serviceResponse({ status: 201, data: user, message: _auth_module.login() }))
    } catch (error) {
        _handleCatchErrors(error, res)
    }
}

// logout controller 

module.exports.logout = async (req, res) => {
    // #swagger.tags = ['user auth']
    try {
        res.clearCookie("token");
        return res.status(200).send(new serviceResponse({ status: 200, message: _auth_module.logout() }))
    } catch (error) {
        _handleCatchErrors(error, res)
    }
}

// forgot password controller ---- currently not created 

module.exports.forgot_password = async (req, res) => {
    // #swagger.tags = ['user auth']
    try {
        const { email } = req.body;
    } catch (error) {
        _handleCatchErrors(error, res)
    }
}

// reset password controller ---- currently not created 

module.exports.resetPassword = async (req, res) => {
    // #swagger.tags = ['user auth']
    try {
        const token = req.params.token;
        const { password, confirmPassword } = req.body;

    } catch (error) {
        _handleCatchErrors(error, res)
    }
}