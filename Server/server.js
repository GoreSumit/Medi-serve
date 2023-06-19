const express = require('express');
const cors = require('cors')
const server = express();
require('dotenv').config()
const PORT = 4000;
const medicineRoutes = require('./routes/medicines');
const categoriesRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');
const uploadRoutes = require('./routes/files');
const mongoose = require('mongoose');



(async function(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/mediserve');
        console.log('Database Conntected Successfully');
    }catch(err){
        console.log('Connection Failed!',err);
    }
})();

const corsOptions={
    origin:'http://localhost:4200'
}
//to handle post body
server.use(express.json());
server.use(cors(corsOptions))




server.get('/',(req,res)=>{
    res.send({
        message:'Hello Medi-Serve'
    });
});

server.use('/medicines', medicineRoutes);
server.use('/categories', categoriesRoutes);
server.use('/users',userRoutes);
server.use('/files',uploadRoutes);

server.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});