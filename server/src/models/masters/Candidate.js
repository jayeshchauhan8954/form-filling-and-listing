// models/Candidate.js
const mongoose = require('mongoose');
const { _commonKeys } = require('@src/utils/helpers/collection');
const { _collectionName, _status } = require('@src/utils/constants');

const candidateSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    dob: { type: Date, required: true },
    // Residential Address
    residentialAddress: {
        street1: { type: String, required: false },
        street2: { type: String, required: false }
    },
    // Permanent Address
    permanentAddress: {
        street1: { type: String },
        street2: { type: String }
    },
    // Document Information (array to handle multiple documents)
    documents: [
        {
            fileName: { type: String, required: true },
            fileType: { type: String, required: true },
            filePath: { type: String, required: true }
        }
    ],
    status: { type: String, enum: Object.values(_status), default: _status.Active },
    ..._commonKeys
}, { timestamps: true });


const Candidate = mongoose.model(_collectionName.Candidate, candidateSchema);

module.exports = { Candidate }
