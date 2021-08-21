const express = require(`express`);
const router = express.Router();

const app = express();

app.use(express.json());

//Test
router.post(`/`, async (req, res) => {
    console.log(req.params);
    res.send(req.params);
});

//Listen
const appPort = 3000;
app.listen(appPort, function(){
    console.log(`listening on port ${appPort}...`);
});