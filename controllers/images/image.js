const uploadController = require('./upload');
const retrieveController = require('./retrieve');
const deleteController = require('./delete');

module.exports = {
    index: (req, res) => {
        res.send('Index');
    },
    getAll: (req, res) => {
        retrieveController.getAllImages(req, res);
    },
    getSpecific: (req, res) => {
        retrieveController.getSpecificImage(req, res);
    },
    deleteSpecific: (req, res) => {
        deleteController.deleteSpecificImage(req, res);
    },
    upload: (req, res) => {
        uploadController.uploadSingleImage(req, res);
    }
};