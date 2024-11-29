const { _status } = require("@src/utils/constants");
const { _response_message } = require("@src/utils/constants/messages");
const { _handleCatchErrors } = require("@src/utils/helpers");
const { serviceResponse } = require("@src/utils/helpers/api_response");
const { Candidate } = require("@src/models/masters/Candidate");
const { uploadOnCloudinary } = require("@src/utils/cloudinary");
const fs = require("fs")

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */

module.exports.candidateRegistration = async (req, res, next) => {
    // #swagger.tags = ['candidate registration form']
    try {
        const { firstName, lastName, email, dob, residentialAddress, permanentAddress, sameAsResidential, documents } = req.body;

        // Check if the candidate already exists
        const existingCandidate = await Candidate.findOne({ $or: [{ email }], deletedAt: null });
        if (existingCandidate) {
            return res.status(403).send(new serviceResponse({
                status: 403,
                errors: [{ message: _response_message.allReadyExist("email") }]
            }));
        }

        // Prepare the candidate object
        const newCandidate = new Candidate({
            firstName,
            lastName,
            email,
            dob,
            residentialAddress: {
                street1: residentialAddress[0],
                street2: residentialAddress[1]
            },
            permanentAddress: sameAsResidential ? {
                street1: residentialAddress[0],
                street2: residentialAddress[1]
            } : {
                street1: permanentAddress[0],
                street2: permanentAddress[1]
            },
        });

        // Upload documents to Cloudinary and store metadata in the database
        const uploadedDocuments = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                // Upload file to Cloudinary
                const cloudinaryUrl = await uploadOnCloudinary(file.path);

                // Store the file URL and metadata
                uploadedDocuments.push({
                    fileName: file.originalname,
                    fileType: file.mimetype,
                    filePath: cloudinaryUrl,  // Cloudinary URL
                });

                // Optionally delete the file after upload to Cloudinary (if you no longer need it locally)
                fs.unlinkSync(file.path);
            }
        }
        // Save the candidate with uploaded documents
        newCandidate.documents = uploadedDocuments;
        await newCandidate.save();

        // Return the success response
        return res.status(201).send(new serviceResponse({
            status: 201,
            data: newCandidate,
            message: 'Candidate registration successful'
        }));

    } catch (error) {
        return _handleCatchErrors(error, res); // Catch unexpected errors
    }
};


/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */


/**
 * Fetches all registered candidates
 * Only accessible to the admin
 */
module.exports.candidateListing = async (req, res, next) => {
    // #swagger.tags = ['candidate registration form']
    try {
        // Fetch all candidates from the database, excluding deleted ones
        const candidates = await Candidate.find({ deletedAt: null }).populate('documents').exec();

        if (!candidates || candidates.length === 0) {
            return res.status(404).send(new serviceResponse({
                status: 404,
                errors: [{ message: 'No candidates found' }]
            }));
        }

        // Return the list of candidates
        return res.status(200).send(new serviceResponse({
            status: 200,
            data: candidates,
            message: 'Candidates fetched successfully'
        }));

    } catch (error) {
        return _handleCatchErrors(error, res);  // Catch unexpected errors
    }
};
