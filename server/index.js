const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./app');

const port = process.env.PORT || 7070;


MongoMemoryServer.create().then((mongod) => {
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    mongoose
        .connect(mongod.getUri(), mongooseOpts)
        .then(() => {
            console.log('MongoDB database Connected...')

            app.listen(port, () =>
                console.log(`Server running on port ${port}, http://localhost:${port}`)
            );
        })
        .catch((err) => console.log(err));
});