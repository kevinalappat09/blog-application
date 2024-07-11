const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BlogSchema = new Schema({
    "title" : {type:String, required:true},
    "subtitle" : {type:String, required:true},
    "author" : {type:Schema.Types.ObjectId, ref:"Author", required:true},
    "tags" : {type:[String],required:true},
    "published_on" : {type:Date, default:null},
    "published_state" : {type:String, enum:['published', 'unpublished'], required:true},
    "blocks" : [{
        id : {type:String, required:true},
        type: {type:String, enum:['header','paragraph','image'], required:true},
        data : {
            text : {type:String},
            level : {type:Number},
            file : {
                url : {type:String},
            },
            caption : {type:String},
            withBorder : {type:Boolean, default:false},
            withBackground : {type:Boolean, default:false},
            stretched: {type:Boolean, default:false},
        },
    }],
});

module.exports = mongoose.model("Blog", BlogSchema);