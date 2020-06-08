const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb')

const app = express();
const port = process.env.PORT || 3000;

const db = new Datastore({ filename: './data/db', autoload: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/all', (req, res) => {
    db.find({}, (err, docs) => {
        res.send({"all": JSON.stringify(docs)});
    });
});

app.get('/top/:n', (req, res) => {
    db.find({}).sort({score: 1}).limit(req.params.n).exec((err, docs) => {
        res.send({"top": JSON.stringify(docs)});
    });
});

app.post('/save', (req, res) => {
    try  {
        let username = req.body.name.toString();
        let score = parseInt(req.body.score);

        db.insert({username: username, score: score}, (err, newDoc) => {   
            console.log("New player added to db");
            res.send({"status":"success"});
        });
    }
    catch (e) {
        console.log("Some error occured:" + e);
        res.send("Wrong data recieved");
    } 
});
