import React, {Component} from 'react';
import axios from 'axios';


const ListeDirector=props=>(
    <tr>      
        <td>{props.director.prenomDirector}</td>
        <td>{props.director.nomDirector}</td>
        <td>{props.director.filmDirector}</td>
        
    </tr>
)


export default class Requete3 extends Component{
 
    constructor(props)
    {
        super(props)

        this.onChangeNombre=this.onChangeNombre.bind(this);
       
        this.onSubmit=this.onSubmit.bind(this);     

        this.state={
            nombre:'',
            ListeDirector:[]
        }
    }
    DirectorList(){
        return this.state.ListeDirector.map(currentDirector=>{
            return <ListeDirector director={currentDirector}/>; 
        })
    }
    onChangeNombre(e){
        this.setState({
            nombre:e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        
        axios.get('http://localhost:5000/requetes/requete3/'+this.state.nombre)
        .then((res) => {
            this.setState({
                ListeDirector:res.data,
                 })
        })
        .catch((err) => {
            // handle err
         });
    }
    
    render(){
        return(
            <div>
                <h3>Combien voulez-vous de réalisateurs ?</h3>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nombre de réalisateur  : </label>
                        <input type="number"
                           required
                           className="form-control"
                           onChange={this.onChangeNombre}
                        
                       />
                    </div>
                    
                    <br/>
                    <div className="form-groupe">
                       
                        <input type="submit" value="Recherche des réalisateurs" className="btn btn-primary"/>
                    </div>
                </form>
                <br/>
                <h4>Voici la liste des réalisateurs qui ont fait le plus de films</h4>
                <br/>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Prenom</th>
                            <th>Nom</th>
                            <th>Nombre de film</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                     {this.DirectorList()}
                    </tbody>
                </table>
            </div>
        )
    }
}