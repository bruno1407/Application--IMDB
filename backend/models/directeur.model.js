const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const directeurShema=new Schema  (
    {
        id: { type: String},
        first_name: { type: String},
        last_name: {type: String}
    },
    { 
        collection : 'director' 
    }
)

const directeur=mongoose.model('director',directeurShema);
module.exports=directeur;