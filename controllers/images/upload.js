// Declare utils
const variables = require('../../util/variables');
const multer = require('multer');
const path = require('path');
const api = require('../../util/api');
const imagesCollection = api.collections.images;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/../../public/images/'+ req.params.username);
    },
    filename: function (req, file, cb) {
        cb(null, variables.fileNameGenerator(file));
    }
});

const avatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/../../public/avatars');
    },
    filename: function (req, file, cb) {
        console.log(req.params);
        cb(null, variables.avatarNameGenerator(req.params.username, file));
    }
});

// Initialize upload options
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        variables.checkFileType(file, cb);
    }
}).any();

const avatar = multer({
    storage: avatarStorage,
    fileFilter: function (req, file, cb) {
        variables.checkAvatarType(file, cb);
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
                    const pathElements = req.files[0].path.split('\\').filter( s => s !== '');
                    const filePath = pathElements[pathElements.length - 2] + '/' + pathElements[pathElements.length - 1];
                    res.send(variables.requestSuccess('Файлът е успешно качен', {filename: filePath}));
                }
            }
        });
    },
    uploadUserAvatar: (req, res) => {
        avatar(req, res, (err) => {
            if (err) {
                res.send(variables.requestFail(err));
            } else {
                if (req.files === undefined) {
                    res.send(variables.requestFail('Няма избран файл'));
                } else {
                    const filePath = req.files[0].filename;
                    res.send(variables.requestSuccess('Файлът е успешно качен', {filename: filePath}));
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