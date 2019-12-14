import React, {Component} from 'react';
import axios from 'axios';

export default class Data extends Component{
    /* Définition d'un constructeur avec toutes les variables nécessaire pour le stockage et l'affichage d'informations importante*/
  constructor(props){
    super(props);
    this.state = {
      size:'',
      NbrChunksGenres:'',
      NbrChunksMovie:'',
      ListeRSGenres:'',
      ListeRSMovies:'',
      ShardGenres:'',
      ShardMovie:'',
      RepartitionGenres:'',
      RepartitionMovies:'',
      nombreIndexGenres:'',
      nombreIndexMovies:'',
      IndexSizeGenre:'',
      IndexSizeMovie:'',
      
    }
  }

/* Fonction qui prend en entré un tableau de string avec le nom des shards et return un string plus lisible */
  AfficherShard(TabShard)
  {
    var MesRS='';
    for(var i=0;i<TabShard.length;i++)
    {
      if(i<TabShard.length-1)
      MesRS+=TabShard[i]+', ';
      else  MesRS+=TabShard[i];
    }
    return MesRS;
  }

  
/* Fonction qui prend en entré un documents json avec des informations sur la répartition des données et return un string plus lisible */
  AfficherRepartition(shards)
  {
    var repartition='';
    var MesShard=this.getKeys(shards);
    for (var i=0;i<MesShard.length;i++)
    {   
      //var shard=MesShard[i];
      repartition+=MesShard[i]+" : "+ shards[MesShard[i]].count+" documents. \n";
    }
    return repartition;
  }

/* idem que pour la fonction précedente */
  AfficherTailleIndex(indexSize,i)
  {
    var size='';
    var mesIndexs=this.getKeys(indexSize);
    size+=mesIndexs[i]+" : "+indexSize[mesIndexs[i]]+"\n";    
    return size;
  }

  
/* Cette fonction permet d'envoyer un json en entré et d'avoir les differents clefs de se json dans un tableau
Exemple : En entrée on met a{b:c,d:e,f:g}, En sortie on aura [b,d,f]

*/
  getKeys(key) {
    var obj = key,
        keys = [];
    if(Object.keys) {
        keys = Object.keys(obj);
    } else {
        for(var k in obj) {
            keys.push(k);
        }
    }
    return keys;
  }

/* Fonction qui se lance dès le début du chargement. Elle appelle les APIs voulu pour y chercher les informations désiré */
  componentDidMount(){
    axios.get('http://localhost:5000/admin/genres')
    .then(response=>{        
            this.setState({
    
              ListeRSGenres:this.getKeys(response.data.shards),    
              NbrChunksGenres:response.data.nchunks,  
              nombreIndexGenres:response.data.nindexes,             
              RepartitionGenres:response.data.shards,
              IndexSizeGenre:response.data.indexSizes         
            })    
            return axios.get('http://localhost:5000/admin/movies')     
    }).then((response) => {
           
      this.setState({
              ListeRSMovies:this.getKeys(response.data.shards),
              NbrChunksMovies:response.data.nchunks,
              RepartitionMovies:response.data.shards,
              nombreIndexMovies:response.data.nindexes,
              IndexSizeMovie:response.data.indexSizes  

           })
  })
  .catch((err) => {
      // handle err
   });
}

  render(){
    return (
      <div className="chart">
      
        <br/>
       <table className="table">
                    <thead className="thead-light">
                        <tr>
                          <th>X</th>
                          <th>Collection genres</th>
                          <th>Collection movie</th>
                        </tr>
                        <tr>
                          <th>Nombre de Chunks</th>
                          <td>{this.state.NbrChunksGenres}</td>
                          <td>{this.state.NbrChunksMovies}</td>
                        </tr>
                        <tr>
                          <th>Nom des shards</th>
                          <td>{this.AfficherShard(this.state.ListeRSGenres)}</td>
                          <td>{this.AfficherShard(this.state.ListeRSMovies)}</td>
                        </tr>
                        <tr>
                          <th>Repartition des données</th>
                          <td>{this.AfficherRepartition(this.state.RepartitionGenres)}</td>
                          <td>{this.AfficherRepartition(this.state.RepartitionMovies)}</td>
                        </tr>  
                        <tr>
                          <th>Nombre d'index</th>
                          <td>{this.state.nombreIndexGenres}</td>
                          <td>{this.state.nombreIndexMovies}</td>
                        </tr>  
                        <tr>
                          <th rowspan="2">Taille des index</th>
                          <td>{this.AfficherTailleIndex(this.state.IndexSizeGenre,0)}</td>
                          <td>{this.AfficherTailleIndex(this.state.IndexSizeMovie,0)}</td>
                          
                        </tr>      
                        <tr>
                         
                          <td>{this.AfficherTailleIndex(this.state.IndexSizeGenre,1)}</td>
                          <td>{this.AfficherTailleIndex(this.state.IndexSizeMovie,1)}</td>
                          
                        </tr>                                       
                    </thead>
                    <tbody>
              
                    </tbody>
                </table>
      </div>
    )
  }
}
