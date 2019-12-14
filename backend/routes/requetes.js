const router=require('express').Router();

/* Récupération de tous les models de collection utile pour nos requêtes. 
C'est à partir de ces variables que nous pourront effectuer nos recherches */

let movie=require("../models/movie.model");
let genres=require("../models/genre.model");
let acteurs=require("../models/acteur.model");
let director=require("../models/directeur.model");
let directorMovie=require("../models/directeur_movie.model");

/** Premiere requête pour récuperer un liste avec tout les differents genres de film possible pour pouvoir les proposer à l'utilisateur */

router.route("/requete1").get((req,res)=>{
   
    genres.distinct("genre")
        .then(datas=>res.json(datas))
        .catch(err=>res.status(400).json('Error:'+ err))

});

/* Une fois que nous connaissons le genre de film désiré grace au paramètre /:genre, 
 nous pouvons lancer une requête qui retournera les films les mieux notés de se genre*/
router.route('/requete1/genre/:genre').get((req,res)=>{
    genres.aggregate([
        {$match :{"genre" : req.params.genre,"$and":[{"movie.rank":{"$ne":"0"}},{"movie.rank":{"$ne":null}}]}},
        {$sort:{'movie.rank':-1}},
        {$limit:100}
       ])
        .then(datas=>res.json(datas))
        .catch(err=>res.status(400).json('Error:'+ err))    
});

/* Cette deuxième requête va dans un premier temps, recupéré l'id d'un acteur en question*/
router.route("/requete2/:prenom/:nom").get((req,res)=>{
    acteurs.find({"first_name":req.params.prenom,"last_name":req.params.nom},{"id":1})
    .then(datas=>res.json(datas))
    .catch(err=>res.status(400).json('Error:'+ err))    
});
/* Une fois l'id trouvé, une recherche est faites sur les films pour retrouver les films les mieux notés de cet acteur*/
router.route("/requete21/movie/:id").get((req,res)=>{
        
        movie.aggregate([{ $match: { "roles.acteur": req.params.id} }, { $sort:
        { "movie_rate": -1 } }])
        .then(datas=>res.json(datas))
        .catch(err=>res.status(400).json('Error:'+ err))
});

function DirectorInfo(prenomDirector,nomDirector,filmDirector) {
    this.prenomDirector = prenomDirector;
    this.nomDirector = nomDirector;
    this.filmDirector = filmDirector;
 
  }
router.route("/requete3/:limit").get((req,res)=>{
    tabDirector=[];
    tabDirectorNbrFilm=[]
    tabDirectorInfo=[]
    directorMovie.aggregate([
        {$group : {_id:"$director_id", "tot":{$sum:1}} },
        {$sort : {tot:-1}},
        {$limit:Number(req.params.limit)}
    ])
   .then(datas=>{
        tabDirectorNbrFilm=datas
        for(var i=0;i<datas.length;i++)
        {
            tabDirector.push(datas[i]._id)
        }
       
        return director.aggregate([
            {
                $match:{
                    "id":{
                        $in:tabDirector
                    }
                },
            }

        ])
   })
   .then(result=>{
        for(var i=0;i<tabDirector.length;i++)
        {
            for(var j=0;j<tabDirectorNbrFilm.length;j++)
            {
                for(var k=0;k<result.length;k++)
                {
                    if(tabDirector[i]==tabDirectorNbrFilm[j]._id && tabDirector[i]==result[k].id)
                    {
                        tabDirectorInfo.push(new DirectorInfo(result[k].first_name,result[k].last_name,tabDirectorNbrFilm[j].tot))
                    }
                }
               
            }
        }
        return tabDirectorInfo;
         
    })
    .then(result=>{
        res.json(result)
       
    })
   .catch(err=>res.status(400).json('Error:'+ err))

    
});

/* La requête numéro 4 consiste à rentrer un film que l'on a apprécié, 
et la requête affichera tous les films du même genre avec au moins un acteur en commun. 
Pour cela nous avons tout d'abord stocké dans un tableau l'id de tous les acteurs du film, 
Puis nous avons récupérer le genre du film pour stocké dans un autre tableau le nom de tous les films du même genre 
Puis une requête qui vérifie si un film match avec les deux critères*/
router.route("/requete4/:movie").get((req,res)=>{
    var tabActeur=[]
    var tabMovie=[]
    movie.find({"movie_name":req.params.movie},{"roles.acteur":1})
    .then(datas=>{
        for(var i=0;i<datas[0].roles.length;i++)
        {
            tabActeur.push(datas[0].roles[i].acteur)
        }
        return genres.find({"movie.name":req.params.movie},{"genre":1}).limit(1)
        
    })   
    .then(datas=>genres.find({"genre":datas[0].genre},{"movie.name":1}))
    .then(datas=>{       
        for(var i=0;i<datas.length;i++){
            tabMovie.push(datas[i].movie.name);
        }
        return movie.aggregate([
        {            
            $match:{
                "movie_name":{
                    $in:tabMovie
                },
                "roles.acteur":{
                    $in:tabActeur
                }
            }
        },
        {
            $sort:{
                "movie_rate":-1
            }
        }
    ])})
    .then(result=>{
        res.json(result)
       
    })
    .catch(err=>res.status(400).json('Error:'+ err))    
});
module.exports=router;