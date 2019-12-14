const router=require('express').Router();
const mongoose=require('mongoose');
const url="mongodb://localhost:27017/local";


/* Connextion à notre base de donnée pour pouvoir analyser les collections */

//const url="mongodb://devincimdb2018.westeurope.cloudapp.azure.com:30000/MovieDB"
mongoose.connect(url,{useNewUrlParser: true, useCreateIndex: true});

const connection2=mongoose.connection;

/* Création d'API qui retournent les informations de la collection genres et de la collection movies */
router.route("/genres").get((req,res)=>{
    connection2.collection('genres').stats().then(data=>res.json(data))
});

router.route("/movies").get((req,res)=>{
    connection2.collection('movies').stats().then(data=>res.json(data))
});
module.exports = router;

