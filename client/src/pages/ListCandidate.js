import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from '@mui/material';
import ListRegisteredForms from '../components/ListCandidates';

function ListCandidatePage() {
    return (
        <>
            <Navbar />
            <Container>
                <ListRegisteredForms />
            </Container>
            <Footer />
        </>
    );
}

export default ListCandidatePage;
