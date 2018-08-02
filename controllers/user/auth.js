const Kinvey = require('kinvey-node-sdk');
const variables = require('./../../util/variables');
const api = require('./../../util/api');
const usersCollection = require('./../../util/api').collections.users;
const fs = require('fs');

function createUserFolder(username) {
    const dir = __dirname + '/../../public/images/' + username;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

module.exports = {
    getApiDetails: (req, res) => {
        res.send({
            host: api.host,
            key: api.appKey,
            secret: api.appSecret
        });
    },
    saveUser: (req, res) => {
        let user = req.body;
        const userPromise = usersCollection.save({
            UID: user.UID,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            blocked: user.blocked,
            roles: user.roles
        })
            .then(function (d) {
                res.send(variables.requestSuccess('Успешно запазихте детайлите за потребителя', d));
            })
            .catch(function (err) {
                res.send(variables.requestFail(err.message));
            })
    },
    createUserFolder: (req, res) => {
        createUserFolder(req.params.username);
    }
}
;