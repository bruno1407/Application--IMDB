import React, {Component} from 'react';
import axios from 'axios';

/* Variable ou y est stocké les informations que l'on souhaite affchier*/
 const ListeGenre=props=>(
     <tr>      
         <td>{props.genre.movie.name}</td>
         <td>{roundDecimal(props.genre.movie.rank,2)}</td>
         <td>{props.genre.genre}</td>
         <td>{props.genre.movie.id}</td>
     </tr>
 )

/* Fontion pour arrondir une valeur, en l'occurence, la note du film*/
function roundDecimal(nombre, precision){
	var precision = precision || 2;
	var tmp = Math.pow(10, precision);
	return Math.round( nombre*tmp )/tmp;
}
export default class Requete1 extends Component{
    constructor(props)
    {
        super(props)

        this.onChangeGenre=this.onChangeGenre.bind(this);
        this.onSubmit=this.onSubmit.bind(this);     

        this.state={
            genre:[],
            genre1:'',
            ListeGenre:[]
        }
    }
 /* Dès que le genre est changé par l'utilisateur, on change aussi la valeur de genre du constructeur*/

    onChangeGenre(e){
        this.setState({
            genre1:e.target.value
        });
    }
/* Fonction qui se lance dès le début du chargement. Elle appelle les APIs voulu pour y chercher les informations désiré */

    componentDidMount(){
        axios.get('http://localhost:5000/requetes/requete1')
        .then(response=>{        
                this.setState({
                    genre1:response.data[0],
                    genre:response.data
                })         
        })
    }
/* Fonction qui sera appelé dans le render pour afficher les valeurs de notre ListeGenre*/
    MovieList(){
        return this.state.ListeGenre.map(currentGenre=>{
            return <ListeGenre genre={currentGenre}/>; 
        })
    }
/* Fonction qui se lance dès qu'on envoie le formulaire. Elle appelle les APIs voulu pour y chercher les informations désiré */

    onSubmit(e){
        e.preventDefault();
        axios.get('http://localhost:5000/requetes/requete1/genre/'+this.state.genre1)
        .then(res=>this.setState({
            ListeGenre:res.data
            })
        );       
        
    }
    
    render(){
        return(
            <div>
                <h3>Trouver un film</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Genre du film : </label>
                        <select ref="userInput"
                            require
                            className="from-control"
                            value={this.state.genre1}
                            onChange={this.onChangeGenre}>
                            {
                                this.state.genre.map(function(genre){
                                    return <option
                                        key={genre}
                                        value={genre}>{genre}
                                    </option>;
                                })
                            }
                        </select>
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
                            <th>Genre</th>
                            <th>Id du film</th>
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