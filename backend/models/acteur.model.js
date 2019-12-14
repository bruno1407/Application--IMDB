const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const acteurShema=new Schema  (
    {
        first_name: { type: String},
        gender: { type: String},
        id: { type: String},
        last_name: { type: String}
    },
    { 
        collection : 'actors' 
    }
)

const acteurs=mongoose.model('acteur',acteurShema);
module.exports=acteurs;