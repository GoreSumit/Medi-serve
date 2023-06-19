
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name:String,
    price:Number,
    exp:Date,
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports=mongoose.model('Medicine',medicineSchema);