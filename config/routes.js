const imageController = require('../controllers/images/image');
const authController = require('../controllers/user/auth');
const journeyController = require('../controllers/journeys/journey');
const adminController = require('../controllers/user/admin');

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
    app.delete('/images/kinvey/delete/:photoID', imageController.deleteFromKinvey);
    app.post('/images/upload', imageController.upload);
    app.post('/images/kinvey/upload', imageController.uploadToKinvey);
    app.get('/images/ids/:journeyID', imageController.getIDs);

    // Journeys routes
    app.get('/journeys', journeyController.getAll);
    app.get('/journeys/:id', journeyController.getByID);
    app.get('/journey/images/:journeyID', journeyController.getImages);
    app.get('/journey/featured/:journeyID', journeyController.getFeatured);
    app.put('/journey/update/:journeyID', journeyController.update);
    app.post('/journey/upload', journeyController.upload);
    app.get('/journey/fields/:journeyID', journeyController.getFields);
    app.get('/journey/all/admin', journeyController.getAllAdmin);
    app.delete('/journeys/delete/:journeyID', journeyController.delete);

    // Users routes
    app.get('/users/all', adminController.getAllUsers);
    app.get('/users/single/:userID', adminController.getSingleUser);
    app.put('/users/update', adminController.updateUser);
};