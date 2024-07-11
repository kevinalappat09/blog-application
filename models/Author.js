const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    "display_name" : {type:String, required:true},
    "joined_on" : {type:Date, required:true},
    "email" : {type:String, required:true},
    "password" : {type:String, required:true}
});

module.exports = mongoose.model("Author", AuthorSchema);