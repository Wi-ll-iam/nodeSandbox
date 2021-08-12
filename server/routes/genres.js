const express = require(`express`);
const router = express.Router();

const genresArray = [
    { id: 1, name: `Action`},
    { id: 2, name: `Scifi`},
    { id: 3, name: `Fantasy`},
    { id: 4, name: `Documentary`},
    { id: 1, name: `Horror`},
    { id: 1, name: `Action`}
];

//Validate genre name
function validateGenreName(valObj){
    const schema = Joi.object(
        { name: Joi.string().min(3).max(20).required() }
    );
    console.log(schema.validate(valObj));
    return schema.validate(valObj);
};

//HTTPGet Genre
router.get(`/`, function(req, res){
    res.send(genresArray);
});

router.get(`/:id`, function(req, res){   
    //404
    const foundGenre = genresArray.find(i => i.id === parseInt(req.params.id));
    if(!foundGenre){
        res.status(404).send(`Genre with given id not found.`);
        return;
    };

    //Send
    res.send(foundGenre);
});

//HTTPPost Genre
router.post(`/`, function(req, res){
    //400
    let validation = validateGenreName(req.body);
    if(validation.error){
        res.status(400).send(`Genre name invalid.`);
        return;
    };
    
    //Post
    newGenre = {
        id: genresArray.length + 1,
        name: req.body.name
    };
    genresArray.push(newGenre);

    //Send
    res.send(genresArray);
});

//HTTPPut
router.put(`/:id`, function(req, res){
        //404
        const foundGenre = genresArray.find(i => i.id === parseInt(req.params.id));
        if(!foundGenre){
            res.status(404).send(`Genre with given id not found.`);
            return;
        };

        //400
        let validation = validateGenreName(req.body);
        if(validation.error){
            res.status(400).send(`Genre name invalid.`);
            return;
        };
        
        //Put
        foundGenre.name = req.body.name;

        //Send
        res.send(foundGenre);
});

//HTTPDelete
router.delete(`/:id`, function(req, res){
    //404
    const foundGenre = genresArray.find(i => i.id === parseInt(req.params.id));
    if(!foundGenre){
        res.status(404).send(`Genre with given id not found.`);
        return;
    };
    
    //Delete
    deleteIndex = genresArray.indexOf(foundGenre);
    genresArray.splice(deleteIndex, 1);

    //Send
    res.send(genresArray);
});

module.exports = router;