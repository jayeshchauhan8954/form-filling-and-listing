const express = require('express');
const { candidateRegistration, candidateListing } = require('./Controller');
const { upload } = require('@src/middlewares/multer');
const masterRouter = express.Router();


masterRouter.post("/candidate-registration", upload, candidateRegistration);
masterRouter.get("/list-candidate-registrations", candidateListing);

module.exports = { masterRouter }