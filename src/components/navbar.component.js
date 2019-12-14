import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">MovieTracker</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/requete" className="navbar-brand">Utilisateur</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/data" className="navbar-brand">Data</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/admin" className="navbar-brand">Admin</Link>
                    </li>



                </ul>
                </div>
            </nav>
        )
    }
}