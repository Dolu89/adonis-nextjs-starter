import React from 'react';
import Link from 'next/link';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import Auth from '../../services/auth';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            dropdownOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    logout() {
        const isLoggedOut = Auth.logout()
        if (isLoggedOut) {
            window.location = '/'
        }
    }

    render() {
        const { isAuthenticated, user, className } = this.props;
        const { isOpen } = this.state;

        const menuOpenClass = isOpen ? 'menu-open' : 'menu-close';

        return (
            <div>
                <Navbar className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`} color="transparent" expand="md">
                    <NavbarBrand className="port-navbar-brand" href="/">Adonext</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="port-navbar-item">
                                <Link href="/">
                                    <a className={`nav-link port-navbar-link ${className}`}> Home </a>
                                </Link>
                            </NavItem>
                            {!isAuthenticated &&
                                <React.Fragment>
                                    <NavItem className="port-navbar-item">
                                        <Link href="/login">
                                            <a className={`nav-link port-navbar-link ${className}`}> Login </a>
                                        </Link>
                                    </NavItem>
                                    <NavItem className="port-navbar-item">
                                        <Link href="/register">
                                            <a className={`nav-link port-navbar-link ${className}`}> Register </a>
                                        </Link>
                                    </NavItem>
                                </React.Fragment>
                            }
                            {isAuthenticated &&
                                <NavItem className="port-navbar-item">
                                    <a onClick={() => this.logout()} className='nav-link port-navbar-link port-nav-default' href=""> Logout ({user.username}) </a>
                                </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}