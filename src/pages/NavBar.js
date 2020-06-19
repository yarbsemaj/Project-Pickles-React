import React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { connect } from 'react-redux'

import logo from '../logo.jpeg'


class BuiltNavbar extends React.Component {
    render() {
        const { user } = this.props;
        return <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/"> <img src={logo} width="30" height="30" class="rounded d-inline-block align-top" alt="" /> Project Pickles</Navbar.Brand>
            {user.name ? <Nav className="navbar-right">
                <NavDropdown title={user.name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/user">Edit</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => { this.logout() }}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav> : null}
        </Navbar>;
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(BuiltNavbar)