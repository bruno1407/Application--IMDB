const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const directeurMovieShema=new Schema  (
    {
        director_id: { type: Number},
        movie_id: { type: Number},
    },
    { 
        collection : 'director_movie' 
    }
)

const directeurMovie=mongoose.model('director_movie',directeurMovieShema);
module.exports=directeurMovie;