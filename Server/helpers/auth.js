const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

console.log(SECRET);
const authenticate = (req,res,next)=>{
    const { authorization } = req.headers;
    console.log(req.headers);
    if(authorization){
        console.log(authorization);
        const arr = authorization.split(" ");
        if(arr[0]==='Bearer'){
            const token = arr[1];

            return jwt.verify(token,SECRET,(err,payload)=>{
                if(err){
                    return res.status(401).send({
                        message:"Unauthenticated",
                        data:err
                    });
                }

                req.userId = payload.id;
                return next();
            });
        }
    }

    return res.status(401).send({
        message:'Unauthenticaated'
    })
}

module.exports=authenticate;