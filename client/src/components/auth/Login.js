import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, FormHelperText, CircularProgress, Modal, Backdrop, Fade } from '@mui/material';
import axios from 'axios';
import { BASE_ROUTE } from '../../config/config';

function Login() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(true);  // Modal state to show the popup

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if at least one of userName or email is provided
        if (!userName && !email) {
            setError('Please provide either userName or email.');
            return;
        }

        // Check if password is provided
        if (!password) {
            setError('Password is required.');
            return;
        }

        setError('');

        try {
            setLoading(true);

            const loginData = { userName, email, password };

            const response = await axios.post(`${BASE_ROUTE}/v1/user/login`, loginData);

            if (response.data.status === 201) {
                console.log('Login successful:', response.data);
                window.location.href = '/list-candidate';
            } else {
                setError(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f4f4f4',
            }}
        >
            <Paper sx={{ padding: 4, width: '100%', maxWidth: 400, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }} align="center">
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* UserName or Email field */}
                    <TextField
                        label="UserName"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        error={error && !userName && !email}
                        helperText={error && !userName && !email ? 'UserName or email is required' : ''}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={error && !userName && !email}
                        helperText={error && !userName && !email ? 'UserName or email is required' : ''}
                    />
                    {/* Password field */}
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={error && !password}
                        helperText={error && !password ? 'Password is required' : ''}
                    />

                    {/* Error message */}
                    {error && (
                        <FormHelperText error={error ? true : false} sx={{ marginBottom: 2 }}>
                            {error}
                        </FormHelperText>
                    )}

                    {/* Submit button with loading state */}
                    <Grid container justifyContent="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%' }}
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                        </Button>
                    </Grid>
                </form>
            </Paper>

            {/* Modal for admin credentials */}
            <Modal
                open={openModal}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        width: 300,
                    }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Admin Credentials
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ marginBottom: 2 }}>
                            If you are an admin, use the following credentials:
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ fontWeight: 'bold' }}>
                            UserName: ADMIN
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ fontWeight: 'bold' }}>
                            Email: admin@gmail.com
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ fontWeight: 'bold' }}>
                            Password: ADMIN
                        </Typography>
                        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                            <Button variant="outlined" onClick={handleModalClose}>
                                Close
                            </Button>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

export default Login;
