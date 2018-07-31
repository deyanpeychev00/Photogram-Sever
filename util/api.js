let Kinvey = require('kinvey-node-sdk');
const def = require('./variables').def;

function signDefaultActiveUser(){
    const promise = Kinvey.User.login(def, def)
        .then(function (user) {
            console.log("Default user logged in.");
            console.log(Kinvey.User.getActiveUser());
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = {
    host: 'https://baas.kinvey.com',
    appKey: 'kid_SkTVZzDAz',
    appSecret: '6e521a85c8ee4f30a0d5281f9cd8c54e',
    initialize: () => {
        console.log('Connecting to Kinvey...');

        Kinvey.init({
            appKey: 'kid_SkTVZzDAz',
            appSecret: '6e521a85c8ee4f30a0d5281f9cd8c54e'
        });


        const pingPromise = Kinvey.ping().then(function (response) {
            console.log('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
        }).catch(function (error) {
            console.log('Kinvey Ping Failed. Response: ' + error.description);
        });

        let activeUser = signDefaultActiveUser();

    },
    collections: {
        journeys: Kinvey.DataStore.collection('journeys'),
        images: Kinvey.DataStore.collection('images'),
        users: Kinvey.DataStore.collection('users')
    },

};