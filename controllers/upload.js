module.exports = {
  uploadSingleImage: (req, res) => {
    if(typeof req.body.filename === 'undefined' || req.body.filename === ''){
        res.send('Error: No filename specified');
    }else{
        res.send('Uploading image: ' + req.body.filename);
    }
  }
};