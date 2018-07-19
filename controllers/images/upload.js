// Declare utils
const variables = require('../../util/variables');
const multer = require('multer');
const path = require('path');
const api = require('../../util/api');
const imagesCollection = api.collections.images;

// Initialize storage options
const storage = multer.diskStorage({
    destination: __dirname + '/../../public/images',
    filename: function (req, file, cb) {
        cb(null, variables.fileNameGenerator(file));
    }
});

// Initialize upload options
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        variables.checkFileType(file, cb);
    }
}).any();

module.exports = {
    uploadSingleImage: (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                res.send(variables.requestFail(err));
            } else {
                if (req.files === undefined) {
                    res.send(variables.requestFail('Няма избран файл'));
                } else {
                    res.send(variables.requestSuccess('Файлът е успешно качен', req.files[0]));
                }
            }
        });
    },
    uploadImageToKinvey: (req, res) => {
        const promise = imagesCollection.save(req.body)
            .then(function onSuccess(entity) {
                res.send(variables.requestSuccess('Снимката е качена в Kinvey успешно', entity))
            })
            .catch(function onError(error) {
                res.send(variables.requestFail(error.message));
            });
    }
};