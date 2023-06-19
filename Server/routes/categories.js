const express = require('express');
const router = express.Router();

let categories = [
    {
        id: 1,
        name: "liquid",
    },
    {
        id: 2,
        name: "tablet",
        
    },
    {
        id: 3,
        name: "capsule",
        
    },
    {
        id: 4,
        name: "Suppositories",
    },
    {
        id: 5,
        name: "drops",
        
    },
    {
        id: 6,
        name: "inhalers",
        
    },
    {
        id: 7,
        name: "injections",
        
    },
];

router.get('/search', (req, res) => {
    const { name } = req.query;
    const filteredCategories = categories.filter(category => {
        let condition = true;
        if (name) { condition = condition && category.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()); };
        return condition;

    });
    res.send({
        message: "categories retrived",
        data: filteredCategories
    });
});

router.get('/', (req, res) => {
    res.send({
        message: "Data sent successfully",
        data: categories
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const category = categories.find(m => m.id === +id);

    if (category) {
        res.send({
            message: "data retrived",
            data: category
        })
    } else {
        res.status(404).send({
            message: "No Data",
            data: null
        })
    }
});

router.post('/', (req, res) => {
    const { name, id } = req.body;
    if (name !== undefined) {
        const category = {
            id: categories.length + 1,
            name,
        };
        categories.push(category);
        res.status(201).send({
            message: 'Category Created',
            data: category
        });
    }
    res.status(400).send({
        message: "name required",
        data: null
    });
});

router.put('/:id', (req, res) => {
    const id = +req.params.id;
    const category = categories.find(m => m.id==id);

    if (category) {
        console.log(category)
        const { name } = req.body;
        category.name = name;
        res.send({
            message: "category updated",
            data: category
        });
    } else {
        res.status(404).send({
            message: "No Data",
            data: null
        })

    }
});

router.patch('/:id', (req, res) => {
    const id = +req.params.id;
    const category = categories.find(m => m.id==id);

    if (category) {
        const { name } = req.body;
        if (name) {
            category.name = name;
        }
        res.send({
            message: "category updated",
            data: category
        })
    } else {
        res.status(404).send({
            message: "No Data",
            data: null
        })

    }
});

router.delete('/:id', (req, res) => {
    const id = +req.params.id;
    const category = categories.find(m => m.id==id);

    if (category) {
        categories = categories.filter(m => m.id !== id);
        res.sendStatus(204);
    } else {
        res.status(404).send({
            message: "No Data",
            data: null
        })

    }
});


module.exports =router;