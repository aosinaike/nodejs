const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static("express"));
// this creates an instance of express module, enabling the feature
// module.exports.

const bodyParser = require('body-parser');
// this enables us to parse JSON

const cors = require('cors');
//Cross Origin Resource Sharing, it allows/denies/sets rules for cross domain requests in the application.

const mongoose = require('mongoose');
// MongoDB adapter for NodeJS

app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true });
// you need to specify database URL. Make sure this is correctly set up with
// database you are using.

const connection = mongoose.connection;connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use('/spa/express', function(req,res){
    res.sendFile(path.join(__dirname+'/spa/express/index.html'));
    //__dirname : It will resolve to your project folder.
});

const routes = express.Router();
routes.route('/articles').get(function(req, res) {
    Article.find(function(err, articles) {
        if (err) {
            console.log(err);
        }
        else
        {
            res.json(articles);
        }
    });
});

routes.route('/article/:id').get(function(req, res) {
    let id = req.params.id;
    Article.findById(id, function(err, art) {
        res.json(art);
    });
});

routes.route('/article/new').post(function(req, res) {
    let art = new Article(req.body);
    art.save()
        .then(art => {
            res.status(200).json({'art': 'article created successfully'});
        })
        .catch(err => {
            res.status(400).send('creating a new article failed');
        });
});

routes.route('/article/update/:id').post(function(req, res) {
    Article.findById(req.params.id, function(err, art) {
        if (!art)
            res.status(404).send("data is not found");
        else
            art.content = req.body.content;
        art.author = req.body.author;
        art.save().then(todo => {
            res.json('Article updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);