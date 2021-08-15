const express = require(`express`);
const Joi = require(`joi`);
const helmet = require(`helmet`);
const morgan = require(`morgan`);
const mongoose = require(`mongoose`);
const app = express();
const startupDebugger = require(`debug`)(`app:startup`);
const genres = require(`./routes/genres`);
const { boolean } = require("joi");
const { permittedCrossDomainPolicies } = require("helmet");

require(`dotenv`).config();

app.set('view engine', 'ejs');
app.set(`views`, `./private/views`);

app.use(express.json());
app.use(express.static(`public`));
app.use(helmet());
if(process.env.NODE_ENV === `development`){
    app.use(morgan(`tiny`));
    startupDebugger(`Morgan Enabled...`);
}
app.use(morgan(`tiny`));
app.use(`/api/genres`, genres);

//DB Connect
mongoose.connect(process.env.MONGOOSE_CONNECTION)
    .then(() => console.log(`Connected to MongoDB...`))
    .catch((err) => console.error(`Could not connect to MongoDB...`, err));

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

const Movie = mongoose.model(`Movie`, movieSchema);


async function createMovie(){

    const movie = new Movie({
        //name: `Foxtrot`,
        genre: `Drama`,
        director: `Samuel Maoz`,
        tags: [],
        isPublished: true
    });

    try {
        const result = await movie.save();
        console.log(result);
    }
    catch(ex) {
        console.log(ex.errors);
    };
}

createMovie();


async function getMovies() {
    const movies = await Movie
        .find({tags: `spider`})
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, genre: 1, director: 1 });
    console.log(movies);
};

//getMovies();

async function updateMovie(id) {
    const movie = await Movie.findById(id);
    if(!movie) return;

    movie.name = `Enemy`;

    const result = await movie.save();

    console.log(result);
};

//updateMovie(`61195834bafc0718f0edc121`);

//Listen
const appPort = process.env.PORT || 3000;
app.listen(appPort, function(){
    console.log(`listening on port ${appPort}...`);
});