const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        first:String,
        last:String
    },
    email:{type:String, unique:true},
    password:{type:String,minLength:[6, 'Minimum 6 characters required']},
    age:{type:Number,min:[18, 'Minimum age required : 18']},
    medicines:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Medicine'
        }
    ]
},{
    timestamps:true,
    toJSON:{virtuals:true}
})

userSchema.virtual('fullname').get(function(){
    return `${this.name.first} ${this.name.last}`
});

userSchema.pre('save',function(next){
    if(!this.isModified('password')){
        return next();
    }
    bcrypt.hash(this.password,10,(err,hash)=>{
        if(err){
            return(err);
        }
        this.password = hash;
        return next();
    });
});


userSchema.methods.comparePassword = function(clientPass,next){
    bcrypt.compare(clientPass,this.password,(err,result)=>{
        if(err){
            return next(err);
        }
        return next(null,result);
    });
}

module.exports= mongoose.model('User',userSchema);