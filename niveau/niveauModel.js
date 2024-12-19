var mongoose = require('mongoose')
const { boolean } = require('yup')
var Schema = mongoose.Schema
var User = new Schema({
    nom : String,
    Nbr_chambre : Number,
    etat_construction : Boolean,
    id_batiment : String
})
module.exports = mongoose.model('niveau', Niveau)