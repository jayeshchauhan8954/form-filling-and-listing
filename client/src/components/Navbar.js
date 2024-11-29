import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" component={Link} to="/">
                        Candidate Registration
                    </Button>
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Registration
                </Button>
                {/* <Button color="inherit" component={Link} to="/list-candidate">
                    All Registrations
                </Button> */}
                <Button color="inherit" component={Link} to="/admin-login">
                    Admin Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
