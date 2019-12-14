const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const movieShema=new Schema  (
    {
        id: { type: String},
        name: { type: String},
        rank: { type: String},
        year: { type: String}
    }
)
const genreShema=new Schema( 
    { 
        
        genre: { type: String},
        movie: { type: movieShema}
    },
    { 
        collection : 'genres' 
    }
)

const genres=mongoose.model('genres',genreShema);
module.exports=genres;