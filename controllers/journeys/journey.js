const retrieveController = require('./retrieve');

module.exports = {
    getAll: (req, res) => {
        retrieveController.getAllJourneys(req, res);
    },
    getByID: (req, res) => {
        retrieveController.getJourneyByID(req, res);
    },
    getImages: (req, res) => {
        retrieveController.getJourneyImages(req, res);
    }
};