const config = require('../../config/config');
const path = require('path');
const variables = require('../../util/variables');
const api = require('../../util/api');
const imagesCollection = api.collections.images;
const Kinvey = require('kinvey-node-sdk');

module.exports = {
    getAllImages: (req, res) => {
        imagesCollection.find()
            .toPromise()
            .then(function onSuccess(data) {
                res.send(variables.requestSuccess('Успешно заредихте снимките', data));
            })
            .catch(function onError(err) {
                res.send(variables.requestFail(err.message));
            });
    },
    getSpecificImage: (req, res) => {
        if (req.params['filename'] === 'undefined' || req.params['filename'] === '') {
            res.send(variables.requestFail('Не е посочено име на файла'));
        } else {
            let filepath = (path.join(config[variables.environment].rootFolder, 'public', 'images', req.params['filename']));
            res.sendFile(filepath);
        }
    },
    getJourneyImagesIDs: (req, res) => {
        let query = new Kinvey.Query();
        query.equalTo('journeyID', req.params['journeyID']);
        query.fields = ['_id'];
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