import React from 'react';
import {
  Link
} from "react-router-dom";
import logo from './img/navbar-logo.svg';

function Navbar() {
  return (
    <nav id="mainNav" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand " ><img src={logo} alt="" /></span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/portfolio">Portfolio</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/projects">Projects</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>
            </ul>
        </div>
    </nav>
  );
}

export default Navbar;

