import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">
                                <strong>Invoice App</strong>
                            </a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href="/invoices">
                            Invoices
                        </NavItem>
                        <NavItem eventKey={2} href="/products">
                            Products
                        </NavItem>
                        <NavItem eventKey={2} href="/customers">
                            Customers
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Header;
