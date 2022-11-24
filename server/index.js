const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cors = require('cors');
const bodyParser = require('body-parser');
const LinkShortnerRoutes = require('./routes/api/linkShortner');
const LinkRedirectRoutes = require('./routes/linkRedirect');

const app = express();

const publicPath = path.join(__dirname, "..", "client/build");

app.use(cors()) // to allow cross origin requests
app.use(bodyParser.json()) // to convert the request into JSON

MongoMemoryServer.create().then((mongod) => {
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    mongoose
        .connect(mongod.getUri(), mongooseOpts)
        .then(() => {
            console.log('MongoDB database Connected...')

            app.use('/api', LinkShortnerRoutes);
            app.use('/', LinkRedirectRoutes);
            app.use(express.static(publicPath));
            app.get("/", function (req, res) {
                res.sendFile(path.join(publicPath, "index.html"));
            });
            app.listen(process.env.PORT || 7070);
        })
        .catch((err) => console.log(err));
});

