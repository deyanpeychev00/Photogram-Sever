const retrieveController = require('./retrieve');
const updateController = require('./update');
const uploadController = require('./upload');
const deleteController = require('./delete');

module.exports = {
    getAll: (req, res) => {
        retrieveController.getAllJourneys(req, res);
    },
    getByID: (req, res) => {
        retrieveController.getJourneyByID(req, res);
    },
    getImages: (req, res) => {
        retrieveController.getJourneyImages(req, res);
    },
    getFeatured: (req, res) => {
        retrieveController.getJourneyFeaturedImage(req, res);
    },
    update: (req, res) => {
        updateController.updateJourney(req, res);
    },
    upload: (req, res) => {
        uploadController.uploadJourney(req, res);
    },
    getFields: (req, res) => {
        retrieveController.getCurrentJourneyFields(req, res);
    },
    getAllAdmin: (req, res) => {
        retrieveController.getJourneysForAdmin(req, res);
    },
    delete: (req, res) => {
        deleteController.deleteJourney(req, res);
    }
};