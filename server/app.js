const express = require(`express`);
const Joi = require(`joi`);
const helmet = require(`helmet`);
const morgan = require(`morgan`);
const mongoose = require(`mongoose`);
const app = express();
const startupDebugger = require(`debug`)(`app:startup`);
const movies = require(`./routes/movies`);
const { boolean } = require("joi");
const { permittedCrossDomainPolicies } = require("helmet");

require(`dotenv`).config();

app.set('view engine', 'ejs');
app.set(`views`, `./private/views`);

app.use(express.json());
app.use(helmet());
if(process.env.NODE_ENV === `development`){
    app.use(morgan(`tiny`));
    startupDebugger(`Morgan Enabled...`);
}
app.use(morgan(`tiny`));
app.use(`/`, movies);

//DB Connect
mongoose.connect(process.env.MONGOOSE_CONNECTION)
    .then(() => console.log(`Connected to MongoDB...`))
    .catch((err) => console.error(`Could not connect to MongoDB...`, err));

//Listen
const appPort = process.env.PORT || 3000;
app.listen(appPort, function(){
    console.log(`listening on port ${appPort}...`);
});