const express = require('express');
const router = express.Router();
const multer = require('multer');



// const upload = multer({dest:'uploads/'});
const storage = multer.diskStorage(
    {
        destination:'uploads/',
        filename:(req,file,cb)=>{
            const filesplit = file.originalname.split('.');
            const filename = file.fieldname + '-' + Date.now() + '.' + filesplit.at(-1);

            cb(null,filename)
        }
    }
)

const upload = multer({storage});


router.post('/upload', upload.single('medicine_image'),(req,res)=>{
    console.log(req.file);
    res.send({
        message:"File Uploaded"
    });
});


module.exports=router;