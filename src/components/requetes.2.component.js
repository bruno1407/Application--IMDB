import React, {Component} from 'react';
import axios from 'axios';

const ListeMovie=props=>(
    <tr>      
        <td>{props.movie.movie_name}</td>
        <td>{roundDecimal(props.movie.movie_rate,2)}</td>
        <td>{props.movie.movie_year}</td>
        
    </tr>
)
function roundDecimal(nombre, precision){
	var precision = precision || 2;
	var tmp = Math.pow(10, precision);
	return Math.round( nombre*tmp )/tmp;
}
export default class Requete2 extends Component{
 
    constructor(props)
    {
        super(props)

        this.onChangeNom=this.onChangeNom.bind(this);
        this.onChangePrenom=this.onChangePrenom.bind(this);
        this.onSubmit=this.onSubmit.bind(this);     

        this.state={
            nom:'',
            prenom:'',
            IdActeur:'',
            ListeMovie:[]
        }
    }
    onChangeNom(e){
        this.setState({
            nom:e.target.value
        });
    }
    onChangePrenom(e){
        this.setState({
            prenom:e.target.value
        });
    }
    MovieList(){
        return this.state.ListeMovie.map(currentMovie=>{
            return <ListeMovie movie={currentMovie}/>; 
        })
    }
 
    onSubmit(e){
      
        e.preventDefault();
        
        axios.get('http://localhost:5000/requetes/requete2/'+this.state.prenom+'/'+this.state.nom)
        .then((res) => {
            this.setState({
                    IdActeur:res.data[0].id
                     })                  
            return axios.get('http://localhost:5000/requetes/requete21/movie/'+this.state.IdActeur);
        })
        .then((res) => {
           
            this.setState({
                ListeMovie:res.data
                 })
        })
        .catch((err) => {
            // handle err
         });
    }
    
    render(){
        return(
            <div>
                <h3>Ecrivez le nom de l'acteur à rechercher</h3>
                <br/>
                <form onSubmit={this.onSubmit}>              
                    <div className="form-groupe">
                    <label>Prenom</label>
                       <input type="text"
                           required
                           className="form-control"
                           onChange={this.onChangePrenom}
                       />
                   </div>
                   <br/>
                   <div className="form-groupe">
                    <label>Nom</label>
                        <input type="text"
                            required
                            className="form-control"
                            onChange={this.onChangeNom}
                        />
                    </div>
                    <br/>
                    <div className="form-groupe">
                       
                        <input type="submit" value="Recherche" className="btn btn-primary"/>
                    </div>
                </form>
                <br/>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Nom du film</th>
                            <th>Note</th>
                            <th>Année</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                     {this.MovieList()}
                    </tbody>
                </table>
            </div>
        )
    }
}