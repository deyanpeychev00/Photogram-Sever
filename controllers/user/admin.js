const Kinvey = require('kinvey-node-sdk');
const usersCollection = require('./../../util/api').collections.users;
const variables = require('./../../util/variables');
const fs = require('fs');

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
    },
    deleteFromServer: (req, res) => {
        console.log(req.params['userID']);
        const promise = Kinvey.User.remove(req.params['userID'], {
            hard: true
        })
            .then(function(data) {
                res.send(variables.requestSuccess('Потребителят е изтрит успешно', data));
            })
            .catch(function(error) {
                res.send(variables.requestFail(error.message));
            });
    },
    deleteFromDataBase: (req, res) => {
        const promise = usersCollection.removeById(req.params['userID'])
            .then(function onSuccess(entity) {
                res.send(variables.requestSuccess('Данните за потребителя са изтрити успешно', entity))
            })
            .catch(function onError(error) {
                res.send(variables.requestFail(error.message));
            });
    },
    deleteUserDirectory: (req, res) => {
        fs.rmdir(__dirname + '/../../public/images/'+ req.params.username, (cb) => {
            res.send(cb);
        });
    }
};