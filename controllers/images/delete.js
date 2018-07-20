const fs = require('fs');
const variables = require('./../../util/variables');
const api = require('../../util/api');
const imagesCollection = api.collections.images;

module.exports = {
    deleteSpecificImage: (req, res) => {
        const filename = req.body.picName || req.body.fileName;
        let path = __dirname + '/../../public/images/' + filename;

        fs.unlink(path, (err) => {
            if (err) res.send(variables.requestFail(err.message));
            res.send(variables.requestSuccess('Успешно изтрихте файла'))
        });
    },
    deleteImageFromKinvey: (req, res) => {
        const promise = imagesCollection.removeById(req.params['photoID'])
            .then(function onSuccess(result) {
                res.send(variables.requestSuccess('Успешно изтрихте снимката от Kinvey', result));
            }).catch(function onError(error) {
                res.send(variables.requestFail(error.message));
            });
    }
};