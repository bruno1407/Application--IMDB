import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
//Utiliser materiel UI

import accueil from "./components/accueil.component"
import NavBar from "./components/navbar.component"
import MesRequete from "./components/requetes.component"
import Requete1 from "./components/requetes.1.component"
import Requete2 from "./components/requetes.2.component"
import Requete3 from "./components/requetes.3.component"
import Requete4 from "./components/requetes.4.component"
import Data from "./components/data.component"
import Admin from "./components/admin.component"

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar/>
        <br/>
        <Route path="/" exact component={accueil}/>
        <Route path="/requete" exact component={MesRequete}/>
        <Route path="/data" exact component={Data}/>
        <Route path="/requete/requete1" exact component={Requete1}/>
        <Route path="/requete/requete2" exact component={Requete2}/>
        <Route path="/requete/requete3" exact component={Requete3}/>
        <Route path="/requete/requete4" exact component={Requete4}/>
        <Route path="/admin" exact component={Admin}/>
      </div>
    </Router>
  );
}

export default App;
