const imageController = require('../controllers/images/image');
const authController = require('../controllers/user/auth');
const journeyController = require('../controllers/journeys/journey');

module.exports = (app) => {
    // Index route
    app.get('/', imageController.index);

    // Auth routes
    app.post('/login', authController.login);
    app.post('/register', authController.register);
    app.get('/logout', authController.logout);

    // Images routes
    app.get('/images', imageController.getAll);
    app.get('/images/get/all', imageController.getAll);
    app.get('/images/get/single/:filename', imageController.getSpecific);
    app.post('/images/delete', imageController.deleteSpecific);
    app.post('/images/upload', imageController.upload);

    // Journeys routes
    app.get('/journeys', journeyController.getAll);
    app.get('/journeys/:id', journeyController.getByID);
    app.get('/journey/images/:journeyID', journeyController.getImages);
};