const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authenticate = require('../helpers/auth');

const SECRET = process.env.SECRET;

router.get('/', async (req,res)=>{
    res.send({
        message:"Users Fetched Successfully",
        data: await User.find({},{password:0,__v:0})
    })
});

router.get('/:id/medicines', async(req,res)=>{
    const{id}=req.params;
    const user = await User.findById(id,{medicines:1}).populate('medicines',{__v:0,addedBy:0});

    if(user){
        res.send({
            message:"Retrived medicines by user",
            data:user.medicines
        });
    }
    else{
        res.status(404).send({
            message:"User not found",
            data:null
        })
    }
})

router.post('/',async(req,res)=>{
    const{firstname,lastname,email,password,age}=req.body;

    try{

        const user = new User({
            name:{
                first:firstname,
                last:lastname
            },
            email,
            password,
            age
        })
        const savedUser = await user.save();

        res.status(201).send({
            message: 'User Created',
            data: savedUser
        });
    
       
    }catch(err){
        res.status(400).send({
            message:"Some Error Occured",
            data:err
        })
    }
    
})

router.post('/login', async (req,res)=>{
    console.log("logincalled");
    const{email,password}=req.body;

    if(email,password){
       const user = await User.findOne({ email });

        if(user){
            user.comparePassword(password,(err,result)=>{
                if(err){
                    return res.status(400).send({
                        message:"Invalid email or password",
                        data:null,
                        error:res.statusCode
                    })
                }
                if(result){
                    const token = jwt.sign({id:user._id},SECRET,{ expiresIn:'1d'});
                    return res.status(200).send({
                        message:"login successful",
                        data:token,
                        id:user._id,
                        name:user.name,

                        
                    });
                }else{
                    res.status(400).send({
                        message:"login failed",
                        data:"Bad Request",
                        
                    });

                }
                
            });

            
        }else{
            res.status(404).send({
                message:"invalid user credentials",
                data:null,
                error:res.statusCode
            });
        }
    }else{
        res.status(400).send({
            message:"bad request",
            data:null,
            error:res.statusCode
        
        })
        

    }




    

})


module.exports =router;
