const Kinvey = require('kinvey-node-sdk');

module.exports = {
    login: (req, res) => {
        const promise = Kinvey.User.login(req.body['username'], req.body['password'])
            .then(function(user) {
                res.send(user);
            })
            .catch(function(error) {
                res.send(error);
            });
    }
};