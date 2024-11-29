import React, { useState, useEffect } from 'react';
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, CircularProgress, Box, Typography, IconButton, Divider
} from '@mui/material';
import axios from 'axios';
import DownloadIcon from '@mui/icons-material/Download';
import { BASE_ROUTE } from '../config/config';

function ListRegisteredForms() {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchForms = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_ROUTE}/v1/master/list-candidate-registrations`);
                if (Array.isArray(response.data.data)) {
                    setForms(response.data.data);
                } else {
                    console.error('Expected an array of forms, but got:', response.data.data);
                }
            } catch (error) {
                console.error("Error fetching forms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchForms();
    }, []);

    // Function to handle file download
    // const handleDownload = (fileUrl, fileName) => {
    //     const link = document.createElement('a');
    //     link.href = fileUrl;
    //     link.download = fileName;
    //     link.click();
    // };
    const handleDownload = async (fileUrl, fileName) => {
        try {
            const response = await axios.get(fileUrl, {
                responseType: 'blob' // Get the file as a Blob (binary large object)
            });

            // Create a URL for the Blob and trigger the download
            const blob = new Blob([response.data], { type: 'application/octet-stream' }); // default file type
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob); // create an object URL for the Blob
            link.download = fileName;  // Set the file name for download
            link.click(); // Trigger the download
            URL.revokeObjectURL(link.href); // Clean up the object URL
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    // Function to format the date (DOB)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();  // Format as MM/DD/YYYY (you can customize this)
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" color="primary" gutterBottom>
                Registered Candidate Forms
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{ maxHeight: 600, boxShadow: 3, borderRadius: 2 }}>
                    <Table aria-label="candidate forms">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>DOB</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Address</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Documents</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(forms) && forms.length > 0 ? (
                                forms.map((form, index) => (
                                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, '&:hover': { backgroundColor: '#eaeaea' } }}>
                                        <TableCell>{form.firstName} {form.lastName}</TableCell>
                                        <TableCell>{form.email}</TableCell>
                                        <TableCell>{formatDate(form.dob)}</TableCell>  {/* Format DOB */}
                                        <TableCell>{form.residentialAddress.street1}, {form.residentialAddress.street2}</TableCell>
                                        <TableCell>
                                            {form.documents.length > 0 ? (
                                                form.documents.map((doc, idx) => (
                                                    <Box key={idx} sx={{ marginBottom: 1, display: 'flex', alignItems: 'center' }}>
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            color="primary"
                                                            sx={{ marginRight: 1, textTransform: 'none' }}
                                                            onClick={() => handleDownload(doc.filePath, doc.fileName)}
                                                        >
                                                            {doc.fileName}
                                                        </Button>
                                                        <IconButton
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => handleDownload(doc.filePath, doc.fileName)}
                                                            sx={{ marginLeft: 1 }}
                                                        >
                                                            <DownloadIcon />
                                                        </IconButton>
                                                    </Box>
                                                ))
                                            ) : (
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>No Documents</Typography>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} sx={{ textAlign: 'center', padding: 3 }}>
                                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>No candidates found</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}

export default ListRegisteredForms;
