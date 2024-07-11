const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    "user_display" : {type:String, required:true},
    "user_email" : {type:String, required:true},
    "content" : {type:String, required:true},
    "date_published" : {type:String, required:true}
});

module.exports = mongoose.model("Comment", CommentSchema);