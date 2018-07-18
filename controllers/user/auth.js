const Kinvey = require('kinvey-node-sdk');
const variables = require('./../../util/variables');

module.exports = {
    login: (req, res) => {
        const promise = Kinvey.User.login(req.body['username'], req.body['password'])
            .then(function(user) {
                res.send(variables.requestSuccess('Успешно влизане', user.data));
            })
            .catch(function(error) {
                if(Number(error.code) === 401){
                    error.message = 'Грешно потребителско име или парола. Моля опитайте отново.';
                }
                res.send(variables.requestFail(error.message));
            });
    },
    register: (req, res) => {
        const promise = Kinvey.User.signup(req.body)
            .then(function(user) {
                res.send(variables.requestSuccess('Успешна регистрация', user.data));
            })
            .catch(function(error) {
                res.send(variables.requestFail(error.message));
            });
    },
    logout: (req, res) => {
        const promise = Kinvey.User.logout()
            .then(function(user) {
                res.send(variables.requestSuccess('Успешен изход', user.data || {}))
            }).catch(function(error) {
                res.send(variables.requestFail(error.message));
            });
    }
};