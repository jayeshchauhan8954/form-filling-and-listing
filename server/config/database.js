const mongoose = require('mongoose');
const { DB } = require('./index');

mongoose.connect(`${DB.connection_string}`);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log('✔ Database is now connected');
});

mongoose.connection.once('open', function () {
    console.log('MongoDB connection opened!');
});

// On error in database connection
mongoose.connection.on('error', (error) => {
    console.log('✘ MONGODB ERROR: ', error);
});

mongoose.connection.on('disconnecting', () => {
    console.log('Database is now disconnecting!');
});
mongoose.connection.on('disconnected', () => {
    console.log('Database is now disconnecting!');
    mongoose.connect(`${DB.connection_string}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});