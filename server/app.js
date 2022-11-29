const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

const cors = require('cors');

const LinkShortnerRoutes = require('./routes/api/linkShortner');
const LinkRedirectRoutes = require('./routes/linkRedirect');

const app = express();

const publicPath = path.join(__dirname, "..", "client/build");

app.use(cors()) // to allow cross origin requests
app.use(bodyParser.json()) // to convert the request into JSON

app.use('/api', LinkShortnerRoutes);
app.use('/', LinkRedirectRoutes);
app.use(express.static(publicPath));
app.get("/", function (req, res) {
    res.sendFile(path.join(publicPath, "index.html"));
});

module.exports = app;
