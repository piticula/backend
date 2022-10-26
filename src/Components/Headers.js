import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    NavbarText
} from 'reactstrap'

function Header() {
    return (
        <div className="App">
            {/* <h1 style={{color:"green"}}>Cabeçalho</h1> */}
            <Navbar
                color="info"
                expand="md"
                light
            >
                <NavbarBrand href="/">
                    TPF - Cursos
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                         <UncontrolledDropdown
                            inNavbar
                            nav
                        >
                            <DropdownToggle
                                caret
                                nav
                            >
                                Cadastros
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem  href="/usuarios">
                                    Usuários
                                </DropdownItem>
                                <DropdownItem href="/cursos">
                                    Cursos
                                    </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="/matriculas">
                                    Matrículas
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <NavLink>
                                {/* aqui pode ser outro item      */}
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        Sistema de Cursos da TPF.
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;