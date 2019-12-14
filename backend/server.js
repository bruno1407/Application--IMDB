const express=require('express');
const cors = require('cors');


const url="mongodb://localhost:27017/local";
// const dbname="local";
// const collectionname="genres";

/* Connection a notre server mongodb*/
const mongoose=require('mongoose');
//const url="mongodb://devincimdb2018.westeurope.cloudapp.azure.com:30000/MovieDB"

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Connection successful")
   
})
require('dotenv').config();

const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(url,{useNewUrlParser: true, useCreateIndex: true});


/* Création de deux routes différentes, une pour les requêtes SQL et une autre pour afficher les données. 
Cela permet de créer des APIs plus clair*/

const RequeteRouter=require('./routes/requetes');
const DataRouter=require('./routes/data');
const AdminRouter=require('./routes/admin');

app.use('/requetes',RequeteRouter);
app.use('/data',DataRouter);
app.use('/admin',AdminRouter);


app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
});

