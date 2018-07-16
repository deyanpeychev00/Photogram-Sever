module.exports = {
    getAllImages: (req, res) => {
        res.send('Get All images');
    },
    getSpecificImage: (req, res) => {
        if(req.params['filename'] === 'undefined' || req.params['filename'] === ''){
            res.send('Error: No filename specified.');
        }else{
            res.send('Get image with name: ' + req.params['filename']);
        }
    }
};