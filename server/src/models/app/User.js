const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { _collectionName, _UserType, _status } = require('@src/utils/constants');
const { _commonKeys } = require('@src/utils/helpers/collection');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: false },
    status: { type: String, enum: Object.values(_status), default: _status.Active },
    userType: { type: Number, enum: Object.values(_UserType), default: _UserType.User },
    ..._commonKeys
}, { timestamps: true });

// Middlewares
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.salt = salt

    next();
});

const User = mongoose.model(_collectionName.User, userSchema)

module.exports = { User }