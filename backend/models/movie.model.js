const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const roleschema=new Schema({

    acteur: { type: String},
    movie: { type: String},
    role: { type: String}
   
});
const movieSchema=new Schema( 
    { 
        movie_id:{type:String},
        movie_name:{type:String},
        movie_rate:{type:Number},
        movie_year:{type:String},
        roles:{type:[roleschema]}
    }
    ,{ collection : 'movie' }
);
const movie=mongoose.model('movie',movieSchema);
module.exports=movie;