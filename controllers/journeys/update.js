const variables = require('../../util/variables');
const api = require('./../../util/api');
const journeysCollection = api.collections.journeys;

module.exports = {
    updateJourney: (req, res) => {
        const promise = journeysCollection.save(req.body)
            .then(function onSuccess(entity) {
                res.send(variables.requestSuccess('Пътешествието е променено успешно', entity))
            })
            .catch(function onError(error) {
                res.send(variables.requestFail(error.message));
            });
    }
};