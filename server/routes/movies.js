const express = require(`express`);
const router = express.Router();
const mongoose = require(`mongoose`);
const Joi = require(`joi`);

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    genre: {
        type: String
    },
    director: {
        type: String
    },
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
        message: `Movies must have at least 1 tag`
        }
    },
    isPublished: Boolean
});

//Define Movie class
const Movie = mongoose.model(`Movie`, movieSchema);

//Validate movie name
function validateMovieName(valObj){
    const schema = Joi.object(
        {
            name: Joi.string().min(3).max(20).required(),
            genre: Joi.string(),
            director: Joi.string(),
            tags: Joi.array().required()
        }
    );
    console.log(schema.validate(valObj));
    return schema.validate(valObj);
};

//HTTPGet all Movies
router.get(`/api/movies`, async (req, res) => {
    await Movie.find()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(`Internal server error.\n` + err.message);
            return;
        });
});

//HTTPGet specific movie
router.get(`/api/movies/:id`, async (req, res) => {
    await Movie.findById(req.params.id)
        .then(result => {
            res.status(200).send(result);
            return;
        })
        .catch(err => {
            res.status(404).send(`Record not found.\n` + err.message);
            return;
        });
});

//HTTPPost movie
router.post(`/api/movies`, async function(req, res){
    //Validate
    const validation = validateMovieName(req.body);
    if(validation.error){
        res.status(400).send(`Bad request`);
        return;
    };
    
    let movie = new Movie({
        _id: await mongoose.Types.ObjectId(),
        name: req.body.name,
        genre: req.body.genre,
        director: req.body.director,
        tags: req.body.tags
    });

    await movie
        .save()
        .then(result => {
            res.status(201).send(result);
        })
        .catch(err => {
            res.status(500).send(`Internal server error.\n` + err.message);
            return;
        });
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
        let validation = validateMovieName(req.body);
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