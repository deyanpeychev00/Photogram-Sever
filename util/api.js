let Kinvey = require('kinvey-node-sdk');

module.exports = {
    host: 'https://baas.kinvey.com',
    appKey: 'kid_SkTVZzDAz',
    appSecret: '6e521a85c8ee4f30a0d5281f9cd8c54e',
    initialize: async () => {
        console.log('Connecting to Kinvey...');

        Kinvey.init({
            appKey: 'kid_SkTVZzDAz',
            appSecret:  '6e521a85c8ee4f30a0d5281f9cd8c54e'
        });

        const pingPromise = await Kinvey.ping().then(function(response) {
            console.log('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
        }).catch(function(error) {
            console.log('Kinvey Ping Failed. Response: ' + error.description);
        });
    },
    collections: {
        journeys: Kinvey.DataStore.collection('journeys'),
        images: Kinvey.DataStore.collection('images'),
        users: Kinvey.DataStore.collection('users')
    }
};