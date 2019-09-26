import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Container
} from 'reactstrap';

class AppNavbar extends Component {
    render() {
        return (
            <div>
                <Navbar dark expand="sm">
                    <Container>
                        <NavbarBrand href="/">Lifting Tracker</NavbarBrand>
                    </Container>

                </Navbar>
            </div>
        );
    }
}




export default AppNavbar;