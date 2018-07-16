const imageController = require('../controllers/image');

module.exports = (app) => {
    app.get('/', imageController.index);
    app.get('/images', imageController.getAll);
    app.get('/images/get/all', imageController.getAll);
    app.get('/images/get/single/:filename', imageController.getSpecific);
    app.post('/images/delete', imageController.deleteSpecific);
    app.post('/images/upload', imageController.upload);
};