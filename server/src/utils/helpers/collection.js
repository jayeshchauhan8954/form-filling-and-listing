
const mongoose = require('mongoose');
const { _collectionName } = require('../constants');

exports._commonKeys = {
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: _collectionName.User, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: _collectionName.User, default: null },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: _collectionName.User, default: null }
};