import * as mongoose from 'mongoose'

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }

        mongoose.connect('mongodb://shift:shift1234@localhost:27017/admin', {
            dbName: 'nodejs',
        }, (error) => {
            if (error) {
                console.log('Error on mongodb connection', error);
            }
            else {
                console.log('Mongodb connection success');
            }
        });
    };

    connect();

    mongoose.connection.on('error', (error) => {
        console.error('Error on mongodb connection', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('Mongodb connection has disconnected. Reconnectiong');
        connect();
    });
    
    require('./user');
}