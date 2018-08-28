const imageController = require('../controllers/images/image');
const authController = require('../controllers/user/auth');
const journeyController = require('../controllers/journeys/journey');
const adminController = require('../controllers/user/admin');

module.exports = (app) => {
    // Index route
    app.get('/', imageController.index);
    app.get('/api', authController.getApiDetails);
    app.get('/storage/:username', authController.createUserFolder);
    app.get('/users/delete/storage/:username', adminController.deleteUserDirectory);

    // Auth routes
/*    app.post('/login', authController.login);
    app.post('/register', authController.register);
    app.get('/logout', authController.logout);
*/
    app.post('/user/save', authController.saveUser);
    // Images routes
    app.get('/images', imageController.getAll);
    app.get('/images/all', imageController.getAll);
    app.get('/images/get/single/:userFolder/:filename', imageController.getSpecific);
    app.post('/images/delete', imageController.deleteSpecific);
    app.delete('/images/kinvey/delete/:photoID', imageController.deleteFromKinvey);
    app.post('/images/upload/:username', imageController.upload);
    app.post('/avatar/upload/:username', imageController.uploadAvatar);
    app.get('/avatar/get/:filename', imageController.getAvatar);
    app.post('/images/kinvey/upload', imageController.uploadToKinvey);
    app.get('/images/ids/:journeyID', imageController.getIDs);

    // Journeys routes
    app.get('/journeys/:limit/:skip', journeyController.getAll);
    app.get('/journeys/mine/:author/:limit/:skip', journeyController.getMine);
    app.get('/journeys/user/:author/:limit/:skip', journeyController.getByUser);
    app.get('/journeys/user/ids/:userID/:limit/:skip', journeyController.getByUser);
    app.get('/journeys/user/all/:author', journeyController.getAllByUser);
    app.get('/journeys/:id', journeyController.getByID);
    app.get('/journeys/timeframe/:from/:to', journeyController.getInTimeFrame);
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
    app.get('/users/username/:uName', adminController.getUserByUsername);
    app.put('/users/update', adminController.updateUser);
    app.delete('/users/delete/server/:userID', adminController.deleteFromServer);
    app.delete('/users/delete/database/:userID', adminController.deleteFromDataBase);
};