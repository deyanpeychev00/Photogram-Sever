module.exports = {
    deleteSpecificImage: (req, res) => {
        if(typeof req.body.filename === 'undefined' || req.body.filename === ''){
            res.send('Error: No filename specified.');
        }else{
            res.send('Deleting image: ' + req.body.filename);
        }
    }
};