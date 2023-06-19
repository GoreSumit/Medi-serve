const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Medicine = require('../models/medicine');
const User = require('../models/user');
const authenticate = require('../helpers/auth')


// let medicines = [
//     {
//         id: 1,
//         name: "medicine 1",
//         exp: 2025,
//         price: 120
//     },
//     {
//         id: 2,
//         name: "medicine 2",
//         exp: 2025,
//         price: 120
//     },
//     {
//         id: 3,
//         name: "medicine 3",
//         exp: 2025,
//         price: 120
//     },
//     {
//         id: 4,
//         name: "medicine 4",
//         exp: 2025,
//         price: 120
//     }
// ];

// router.get('/search', (req, res) => {
//     const { name, maxPrice, minPrice } = req.query;
//     const filteredMEdicines = medicines.filter(medicine => {
//         let condition = true;
//         if (name) { condition = condition && medicine.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()); };
//         if (maxPrice !== undefined) {
//             condition = condition && medicine.price <= maxPrice;
//         };
//         if (minPrice !== undefined) {
//             condition = condition && medicine.price <= minPrice;
//         }
//         return condition;

//     });
//     res.send({
//         message: "medicines retrived",
//         data: filteredMEdicines
//     });
// });

router.get('/search', async (req, res) => {
    const { name, maxPrice, minPrice } = req.query;
    let condition = {
        '$and':[]
    };

    if(name){
        condition['$and'].push({
            name: new RegExp(`${name}`,'i')
        });
    };
    if(maxPrice!==undefined){
        condition['$and'].push({
            price:{$lte:maxPrice}
        });
    };
    if(minPrice!==undefined){
        condition['$and'].push({
            price:{$gte:minPrice}
        });
    };

    const filteredMedicines = await Medicine.find(condition);
    
    res.send({
        message: "medicines retrived",
        data: filteredMedicines
    });
});


router.get('/', async (req, res) => {
    
    res.send({
        message: "Data sent successfully",
        data: await Medicine.find()
    })
});




// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     const medicine = medicines.find(m => m.id === +id);

//     if (medicine) {
//         res.send({
//             message: "data retrived",
//             data: medicine
//         })
//     } else {
//         res.status(404).send({
//             message: "No Data",
//             data: null
//         })
//     }
// });

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try{

        const medicine = await Medicine.findById(id,{__v:0}).populate('addedBy',{password:0,medicines:0,__v:0});

        // const medicine = await Medicine.findByOne({
        //     _id:mongoose.Schema.Types.ObjectId(id)
        // });

    
        if (medicine) {
            res.send({
                message: "data retrived",
                data: medicine
            })
        } else {
            res.status(404).send({
                message: "No Data",
                data: null
            });
        }
    }catch(err){
        res.status(404).send({
            message: "Some error occured",
            data: err
        });

    }
});





// router.post('/', (req, res) => {
//     const { name, exp, price } = req.body;
//     if (name && price !== undefined && exp) {
//         const medicine = {
//             id: medicines.length + 1,
//             name,
//             exp,
//             price
//         };
//         medicines.push(medicine);
//         res.status(201).send({
//             message: 'Medicine Created',
//             data: medicine
//         });
//     }
//     res.status(400).send({
//         message: "name,exp,price required",
//         data: null
//     });
// });

router.post('/',authenticate, async (req, res) => {
    const { name, exp, price } = req.body;
    if (name && price !== undefined && exp) {
        const user = await User.findById(req.userId)
        const medicine = new Medicine({
            name,
            exp,
            price,
            addedBy:user._id
        });
        const savedMedicine = await medicine.save();

        user.medicines.push(savedMedicine._id);
        await user.save();

        res.status(201).send({
            message: 'Medicine Created',
            data: savedMedicine
        });
    }else{
        res.status(400).send({
            message: "name,exp,price required",
            data: null
        });
    }
});



// router.put('/:id', (req, res) => {
//     const id = +req.params.id;
//     const medicine = medicines.find(m => m.id==id);

//     if (medicine) {
//         const { name, exp, price } = req.body;
//         medicine.id = id;
//         medicine.name = name;
//         medicine.exp = exp;
//         medicine.price = price;
//         res.send({
//             message: "medicine updated",
//             data: medicine
//         });
//     } else {
//         res.status(404).send({
//             message: "No Data",
//             data: null
//         })

//     }
// });

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try{
        const medicine = await Medicine.findById(id);

        if (medicine) {
            const { name, exp, price } = req.body;
            medicine.id = id;
            medicine.name = name;
            medicine.exp = exp;
            medicine.price = price;
            res.send({
                message: "medicine updated",
                data: await medicine.save()
            });
        } else {
            res.status(404).send({
                message: "No Data",
                data: null
            })
    
        }
    }catch(err){
        res.status(404).send({
            message: "some error occured",
            data: err
        })
    }

});





// router.patch('/:id', (req, res) => {
//     const id = +req.params.id;
//     const medicine = medicines.find(m => m.id==id);

//     if (medicine) {
//         const { name, exp, price } = req.body;
//         if (name) {
//             medicine.name = name;
//         }
//         if (exp) {
//             medicine.exp = exp;
//         }
//         if (price !== undefined) {
//             medicine.price = price;
//         }
//         res.send({
//             message: "medicine updated",
//             data: medicine
//         })
//     } else {
//         res.status(404).send({
//             message: "No Data",
//             data: null
//         })

//     }
// });


router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        
        const medicine = await Medicine.findById(id);
    
        if (medicine) {
            const { name, exp, price } = req.body;
            if (name) {
                medicine.name = name;
            }
            if (exp) {
                medicine.exp = exp;
            }
            if (price !== undefined) {
                medicine.price = price;
            }
            res.send({
                message: "medicine updated",
                data: await medicine.save()
            })
        } else {
            res.status(404).send({
                message: "No Data",
                data: null
            })
    
        }
    }catch(err){
        res.status(404).send({
            message: "some error occured",
            data: err
        })
    }
});

// router.delete('/:id', (req, res) => {
//     const id = +req.params.id;
//     const medicine = medicines.find(m => m.id==id);

//     if (medicine) {
//         medicines = medicines.filter(m => m.id !== id);
//         res.sendStatus(204);
//     } else {
//         res.status(404).send({
//             message: "No Data",
//             data: null
//         })

//     }
// });

router.delete('/:id',authenticate,async (req, res) => {
    const id = req.params.id;

    try{
        const medicine = await Medicine.findById(id);

        if (medicine) {
            await medicine.delete();
            res.sendStatus(204);
        } else {
            res.status(404).send({
                message: "No Data",
                data: null
            })
    
        }
    }catch(err){
        res.status(404).send({
            message: "No Data",
            data: err
        })

    }

});

module.exports =router;