const variables = require('../../util/variables');
const Kinvey = require('kinvey-node-sdk');
const api = require('./../../util/api');
const journeysCollection = api.collections.journeys;
const imagesCollection = api.collections.images;

module.exports = {
    getAllJourneys: (req, res) => {
        journeysCollection.find()
            .toPromise()
            .then(function onSuccess(data) {
                res.send(variables.requestSuccess('Успешно заредихте пътешествията', data));
            })
            .catch(function onError(err) {
                res.send(variables.requestFail(err.message));
            });
    },
    getJourneyByID: (req, res) => {
        journeysCollection.findById(req.params['id'])
            .toPromise()
            .then(function onSuccess(data) {
                res.send(variables.requestSuccess('Успешно заредихте пътешествията', data));
            })
            .catch(function onError(err) {
                res.send(variables.requestFail(err.message));
            });
    },
    getJourneyImages: (req, res) => {
        var query = new Kinvey.Query();
        query.equalTo('journeyID', req.params['journeyID']);
        imagesCollection.find(query)
            .toPromise()
            .then(function onSuccess(data) {
                res.send(variables.requestSuccess('Успешно заредихте снимките', data));
            })
            .catch(function onError(err) {
                res.send(variables.requestFail(err.message));
            });
    }
};