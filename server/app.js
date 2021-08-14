const express = require(`express`);
const Joi = require(`joi`);
const helmet = require(`helmet`);
const morgan = require(`morgan`);
const mongoose = require(`mongoose`);
const app = express();
const startupDebugger = require(`debug`)(`app:startup`);
const genres = require(`./routes/genres`);
const { boolean } = require("joi");

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
    name: String,
    genre: String,
    director: String,
    tags: [ String ],
    isPublished: Boolean
});

const Movie = mongoose.model(`Movie`, movieSchema);

const movie = new Movie({
    name: `Dune`,
    genre: `Scifi`,
    director: `Denis Villeneuve`,
    tags: [`sand`, `worm`, `spice`, `Timothee Chalamet`, `Zendaya`, `Oscar Isaac`, `Jason Momoa`, `Dave Bautista`, `Stellan Skarsgard`],
    isPublished: true
});

//Listen
const appPort = process.env.PORT || 3000;
app.listen(appPort, function(){
    console.log(`listening on port ${appPort}...`);
});