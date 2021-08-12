const express = require(`express`);
const Joi = require(`joi`);
const helmet = require(`helmet`);
const morgan = require(`morgan`);
const app = express();
const startupDebugger = require(`debug`)(`app:startup`);
const genres = require(`./routes/genres`);

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


//Listen
const appPort = process.env.PORT || 3000;
app.listen(appPort, function(){
    console.log(`listening on port ${appPort}...`);
});