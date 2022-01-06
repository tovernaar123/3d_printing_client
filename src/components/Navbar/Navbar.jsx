import React from 'react';
import { Navbar as Bar, Nav } from 'react-bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'
library.add(faUser)

export default function Navbar(props) {
    let items = [
        <Nav.Link className={`navItem ${ props.current === 0 ? "current" : ""}`} key="0" href="">Dashboard</Nav.Link>,
        <Nav.Link className={`navItem ${ props.current === 1 ? "current" : ""}`} key="1" href="">Users</Nav.Link>,
        <Nav.Link className={`navItem ${ props.current === 2 ? "current" : ""}`} key="2" href="">Roles</Nav.Link>
    ]    
    let current_tab = props.current
    if (current_tab){
        
    }
    return (
        <Bar bg="primary" variant="dark" className="mw-100 nav" expand="sm">
            <Bar.Brand href=" ">3d Webgui</Bar.Brand>
            <Bar.Toggle className="navItem" aria-controls="basic-navbar-nav" />
            <Bar.Collapse className="navItem ml-auto" id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {items}
                </Nav>
            </Bar.Collapse>
            <Nav.Link className="navItem ch" href="">
                <FontAwesomeIcon className="mr-2" icon={"user"} />acount
            </Nav.Link>
        </Bar>
    )
}
