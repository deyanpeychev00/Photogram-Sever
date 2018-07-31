const path = require('path');

module.exports = {
    environment: 'development',
    def: 'photogramdefault',
    requestFail: (reason) => {
        return {
            success: false,
            msg: reason
        };
    },
    requestSuccess: (message, data = {}) => {
        return {
            success: true,
            msg: message,
            data: data
        };
    },
    checkFileType: (file, cb) => {
        // Allowed extentions
        let ext = /jpeg|jpg/;
        // Check file extention
        let filename = ext.test(path.extname(file.originalname).toLowerCase());
        // Check file mimetype
        let mimetype = ext.test(file.mimetype);

        if (filename && mimetype) {
            return cb(null, true);
        } else {
            cb('Типът на файла не се поддържа');
        }
    },
    fileNameGenerator: (file) => {
        return Date.now() + '_' +
            Math.abs(Math.random() * (Number.MIN_SAFE_INTEGER - Number.MAX_SAFE_INTEGER) + Number.MAX_SAFE_INTEGER).toString() + '_' +
            Math.abs(Math.random() * (Number.MIN_SAFE_INTEGER - Number.MAX_SAFE_INTEGER) + Number.MAX_SAFE_INTEGER).toString() +
            path.extname(file.originalname)
    },

};