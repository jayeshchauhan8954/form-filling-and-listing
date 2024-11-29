import React, { useState } from 'react';
import {
    TextField, Checkbox, FormControlLabel, Button,
    Box, Grid, Typography, IconButton, MenuItem, Paper, CircularProgress, Snackbar, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { BASE_ROUTE } from '../config/config';

function Form() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        residentialAddress: { street1: '', street2: '' },
        permanentAddress: { street1: '', street2: '' },
        sameAsResidential: false,
        documents: [{ fileName: '', fileType: '', file: null }]
    });
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);  // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbar severity

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddressCheckbox = (e) => {
        const checked = e.target.checked;
        setFormData({
            ...formData,
            sameAsResidential: checked,
            permanentAddress: checked ? formData.residentialAddress : { street1: '', street2: '' }
        });
    };

    const handleDocumentChange = (index, field, value) => {
        const newDocuments = [...formData.documents];
        newDocuments[index][field] = value;
        setFormData({ ...formData, documents: newDocuments });
    };

    const addDocumentField = () => {
        setFormData({
            ...formData,
            documents: [...formData.documents, { fileName: '', fileType: '', file: null }]
        });
    };

    const removeDocumentField = (index) => {
        const newDocuments = [...formData.documents];
        newDocuments.splice(index, 1);
        setFormData({ ...formData, documents: newDocuments });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('firstName', formData.firstName);
        formDataToSubmit.append('lastName', formData.lastName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('dob', formData.dob);
        formDataToSubmit.append('residentialAddress', formData.residentialAddress.street1);
        formDataToSubmit.append('residentialAddress', formData.residentialAddress.street2);
        formDataToSubmit.append('permanentAddress', formData.permanentAddress.street1);
        formDataToSubmit.append('permanentAddress', formData.permanentAddress.street2);
        formDataToSubmit.append('sameAsResidential', formData.sameAsResidential);

        // Add documents to form data
        formData.documents.forEach((doc, index) => {
            if (doc.file) {
                formDataToSubmit.append(`documents`, doc.file);
                formDataToSubmit.append(`documents[${index}].fileName`, doc.fileName);
                formDataToSubmit.append(`documents[${index}].fileType`, doc.fileType);
            }
        });

        try {
            setLoading(true);
            const response = await axios.post(`${BASE_ROUTE}/v1/master/candidate-registration`, formDataToSubmit);
            console.log(response);

            if (response.data.success) {
                // Reset the form state
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    dob: '',
                    residentialAddress: { street1: '', street2: '' },
                    permanentAddress: { street1: '', street2: '' },
                    sameAsResidential: false,
                    documents: [{ fileName: '', fileType: '', file: null }]
                });
                setSnackbarMessage('Candidate created successfully');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);


            } else {
                setSnackbarMessage('Message ' + response.data.message);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setSnackbarMessage('An error occurred. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    // Close Snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 900, margin: 'auto' }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h4" color="primary" gutterBottom>
                    Candidate Registration
                </Typography>
                <Grid container spacing={2}>
                    {/* First Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    {/* Last Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="E-mail"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    {/* Date of Birth */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Date of Birth"
                            name="dob"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.dob}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    {/* Residential Address */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Residential Address</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Street 1"
                            name="residentialAddress.street1"
                            value={formData.residentialAddress.street1}
                            onChange={(e) => setFormData({
                                ...formData,
                                residentialAddress: { ...formData.residentialAddress, street1: e.target.value }
                            })}
                            fullWidth
                            required
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Street 2"
                            name="residentialAddress.street2"
                            value={formData.residentialAddress.street2}
                            onChange={(e) => setFormData({
                                ...formData,
                                residentialAddress: { ...formData.residentialAddress, street2: e.target.value }
                            })}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    {/* Checkbox for Same Address */}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={formData.sameAsResidential} onChange={handleAddressCheckbox} />}
                            label="Same as Residential Address"
                        />
                    </Grid>

                    {/* Permanent Address */}
                    {!formData.sameAsResidential && (
                        <>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>Permanent Address</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Street 1"
                                    name="permanentAddress.street1"
                                    value={formData.permanentAddress.street1}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        permanentAddress: { ...formData.permanentAddress, street1: e.target.value }
                                    })}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Street 2"
                                    name="permanentAddress.street2"
                                    value={formData.permanentAddress.street2}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        permanentAddress: { ...formData.permanentAddress, street2: e.target.value }
                                    })}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        </>
                    )}

                    {/* Documents */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Upload Documents</Typography>
                    </Grid>

                    {formData.documents.map((doc, index) => (
                        <Grid container spacing={2} key={index} alignItems="center" marginBottom={1}>
                            <Grid item xs={4}>
                                <TextField
                                    label="File Name"
                                    value={doc.fileName}
                                    onChange={(e) => handleDocumentChange(index, 'fileName', e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    required
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="File Type"
                                    select
                                    value={doc.fileType}
                                    onChange={(e) => handleDocumentChange(index, 'fileType', e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    required
                                >
                                    <MenuItem value="image">Image</MenuItem>
                                    <MenuItem value="pdf">PDF</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                    startIcon={<CloudUploadIcon />}
                                    size="small"
                                >
                                    Upload
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => handleDocumentChange(index, 'file', e.target.files[0])}
                                        required
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                {index === 0 ? (
                                    <IconButton onClick={addDocumentField}>
                                        <AddIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => removeDocumentField(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Grid>
                        </Grid>
                    ))}

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                            {loading ? <CircularProgress size={24} color="secondary" /> : 'Submit'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Snackbar for success/error message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

export default Form;
