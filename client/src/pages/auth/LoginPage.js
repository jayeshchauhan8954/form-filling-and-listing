import React from 'react';
import { Container } from '@mui/material';
import Login from '../../components/auth/Login';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function LoginPage() {
    return (
        <>
            <Navbar />
            <Container>
                <Login />
            </Container>
            <Footer />
        </>
    );
}

export default LoginPage;
