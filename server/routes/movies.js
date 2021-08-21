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
            tags: Joi.array()
        }
    );
    console.log(schema.validate(valObj));
    return schema.validate(valObj);
};


//Test
router.post(`/`, (req, res) => {
    console.log(`test`);
    console.log(req.body);
    res.send(req);
});

//HTTP get all Movies
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

//HTTP get specific movie
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

//HTTP post movie
router.post(`/api/movies`, async (req, res) => {
    //Validate
    const validation = validateMovieName(req.body);
    if(validation.error){
        res.status(400).send(`Bad request`);
        return;
    };
    const movie = new Movie({
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

//HTTP put movie
router.put(`/api/movies/:id`, async (req, res) => {
    const validation = validateMovieName(req.body);
    if(validation.error){
        res.status(400).send(`Bad request`);
        return;
    };

    const movie = await Movie.findById(req.params.id)
        .then()
        .catch(err => {
            res.status(404).send(`Record not found.\n` + err.message);
            return;
        });
    movie.set({
        name: req.body.name,
        genre: req.body.genre,
        director: req.body.director,
        tags: req.body.tags
    });
    await movie
        .save()
        .then(result => {
            res.status(200).send(result);
            return;
        })
        .catch(err => {
            res.status(500).send(`Internal server error.\n` + err.message);
            return;
        });
});

//HTTPDelete
router.delete(`/api/movies/:id`, async (req, res) => {
    await Movie.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(202).send(result);
            return;
        })
        .catch(er => {
            res.status(404).send(`Record not found.\n` + err.message);
            return;
        });
});

module.exports = router;