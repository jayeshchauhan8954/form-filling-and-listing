import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Form from '../components/Form';
import { Container } from '@mui/material';

function MainPage() {
    return (
        <>
            <Navbar />
            <Container>
                <Form />
            </Container>
            <Footer />
        </>
    );
}

export default MainPage;
