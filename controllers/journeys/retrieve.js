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
        let query = new Kinvey.Query();
        query.equalTo('journeyID', req.params['journeyID']);
        imagesCollection.find(query)
            .toPromise()
            .then(function onSuccess(data) {
                res.send(variables.requestSuccess('Успешно заредихте снимките', data));
            })
            .catch(function onError(err) {
                res.send(variables.requestFail(err.message));
            });
    },
    getJourneyFeaturedImage: (req, res) => {
        let query = new Kinvey.Query();
        query.equalTo('journeyID', req.params['journeyID']);
        query.limit = 1;
        imagesCollection.find(query)
            .toPromise()
            .then(function onSuccess(data) {
                res.send(variables.requestSuccess('Успешно заредихте снимката', data));
            })
            .catch(function onError(err) {
                res.send(variables.requestFail(err.message));
            });
    },
    getCurrentJourneyFields: (req, res) => {
        let query = new Kinvey.Query();
        query.equalTo('_id', req.params['journeyID']);
        query.fields = ['_id','name','caption','ratings','totalReviewers','author'];
        journeysCollection.find(query)
            .toPromise()
            .then(function onSuccess(data) {
                res.send(variables.requestSuccess('Успешно заредихте детайлите на пътешествието', data));
            })
            .catch(function onError(err) {
                res.send(variables.requestFail(err.message));
            });
    },
    getJourneysForAdmin: (req, res) => {
        let query = new Kinvey.Query();
        query.fields = ['_id','name','author'];
        journeysCollection.find(query)
            .toPromise()
            .then(function onSuccess(data) {
                res.send(variables.requestSuccess('Успешно заредихте детайлите на пътешествието', data));
            })
            .catch(function onError(err) {
                res.send(variables.requestFail(err.message));
            });
    }
};