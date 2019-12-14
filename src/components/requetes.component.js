import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class MesRequete extends Component{
 
    render(){
        return(
            <div className="collpase navbar-collapse">
                <h1 align="center">Bienvenue dans l'onglet des requêtes</h1>
                <br/>
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <h4>Requête 1 :
                            <Link to="/requete/requete1" className="navbar-brand">Afficher les films qui ont un certain genre</Link>
                        </h4>
                        <br/>
                    </li>                  
                    <li className="navbar-item">
                        <h4>Requête 2 :
                            <Link to="/requete/requete2" className="navbar-brand">Afficher les meilleurs films d'un acteur</Link>
                        </h4>
                        <br/>
                    </li>             
                    <li className="navbar-item">
                        <h4>Requête 3 :
                            <Link to="/requete/requete3" className="navbar-brand">Afficher les réalisateurs ayant le plus de films à leur actif</Link>
                        </h4>
                        <br/>
                    </li>                   
                    <li className="navbar-item">
                        <h4>Requête 4 :
                            <Link to="/requete/requete4" className="navbar-brand">Afficher les films du même genre qu'un autre film avec au moins un acteur commun</Link>
                        </h4>
                    </li>


                </ul>
                </div>
        )
    }
}