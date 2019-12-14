const router=require('express').Router();

/* Récupération de tous les models de collection utile pour nos requêtes. 
C'est à partir de ces variables que nous pourront effectuer nos recherches */

let movie=require("../models/movie.model");
let genres=require("../models/genre.model");
let acteurs=require("../models/acteur.model");
let director=require("../models/directeur.model");
let directorMovie=require("../models/directeur_movie.model");

/* Création d'APIs qui recolteront des informations sur notre base de données */

/* Recherche du nombre film par genre*/
router.route("/genre").get((req,res)=>{

    genres.aggregate([
        {
            $match:{"$and":[{"genre":{"$ne":"0"}},{"genre":{"$ne":null}}]}
          
        },
        {
            $group:{_id:"$genre","tot":{$sum:1}}
          
        },
        {
            $sort:{"tot":-1}
        }   
    ])
    .then(datas=>res.json(datas))
    .catch(err=>res.status(400).json('Error:'+ err))

});
/* Recherche de nombre de film par année */
router.route("/movieyear").get((req,res)=>{
    movie.aggregate([
        {
            $group : {_id:"$movie_year", "tot":{$sum:1}} 
        },
        {
            $sort : {_id:1}
        },
    ])
    .then(datas=>res.json(datas))
    .catch(err=>res.status(400).json('Error:'+ err))

})
/* Recherche de nombre de femme et d'homme chez les acteurs*/
router.route("/gender").get((req,res)=>{
    acteurs.aggregate([
        {
            $group : {_id:"$gender", "tot":{$sum:1}} 
        }
    ])
    .then(datas=>res.json(datas))
    .catch(err=>res.status(400).json('Error:'+ err))

})

module.exports = router;

