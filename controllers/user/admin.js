const Kinvey = require('kinvey-node-sdk');
const usersCollection = require('./../../util/api').collections.users;
const variables = require('./../../util/variables');

module.exports = {
    getAllUsers: (req, res) => {
        usersCollection.find()
                .toPromise()
                .then(function onSuccess(data) {
                    res.send(variables.requestSuccess('Успешно взехте всички потребители', data));
                })
                .catch(function onError(err) {
                    res.send(variables.requestFail(err.message));
                });
    },
    getSingleUser: (req, res) => {
        let query = new Kinvey.Query();
        query.equalTo('UID', req.params['userID']);
        usersCollection.find(query)
            .toPromise()
            .then(function onSuccess(data) {
                res.send(variables.requestSuccess('Успешно взехте данните за потребителя', data));
            })
            .catch(function onError(err) {
                res.send(variables.requestFail(err.message));
            });
    },
    updateUser: (req, res) => {
        const promise = usersCollection.save(req.body)
            .then(function onSuccess(entity) {
                res.send(variables.requestSuccess('Данните за потребителя са променени успешно', entity))
            })
            .catch(function onError(error) {
                res.send(variables.requestFail(error.message));
            });
    }
};