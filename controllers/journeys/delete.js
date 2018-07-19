// Declare utils
const variables = require('../../util/variables');
const api = require('./../../util/api');
const journeysCollection = api.collections.journeys;

module.exports = {
    deleteJourney: (req, res) => {
        const promise = journeysCollection.removeById(req.params['journeyID'])
            .then(function onSuccess(result) {
                res.send(variables.requestSuccess('Успешно изтрихте пътешествието от Kinvey', result));
            }).catch(function onError(error) {
                res.send(variables.requestFail(error.message));
            });
    }
};