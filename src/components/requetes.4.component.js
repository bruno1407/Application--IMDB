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
export default class Requete4 extends Component{

    constructor(props)
    {
        super(props)

        this.onChangeMovie=this.onChangeMovie.bind(this);
        this.onSubmit=this.onSubmit.bind(this);     

        this.state={
            movie:'',
            ListeMovie:[]
        }
    }
    MovieList(){
        return this.state.ListeMovie.map(currentMovie=>{
            return <ListeMovie movie={currentMovie}/>; 
        })
    }
    componentDidMount(){
        this.setState({
            movie:'Pulp Fiction'
        })
    }
    onChangeMovie(e){
        this.setState({
            movie:e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
       
        axios.get('http://localhost:5000/requetes/requete4/'+this.state.movie)
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
                <h3>Renseigner un nom de film</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-groupe">
                       
                       <input type="text"
                           required
                           className="form-control"
                           onChange={this.onChangeMovie}
                          
                       />
                   </div>
                   <br/>
                    <div className="form-groupe">
                       
                        <input type="submit" value="Recherche" className="btn btn-primary"/>
                    </div>
                </form>
                <br/>
                <h4>Voici la liste des films du même genre, avec au moins un acteur en commun</h4>
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