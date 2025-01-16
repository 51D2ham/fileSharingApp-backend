const multer = require ('multer');
const path = require ('path')
// multer config 

let storage = multer.diskStorage({
    destination:(req, file, cb)    => cb(null,'uploads/'),    // where to store file 
    filename : (req, file ,cb) => {              
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}` // unique name 
        cb(null,uniqueName);
    },
});

// File Filter for specific file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, JPEG, and PNG are allowed.'));
    }
};


const uploadFiles = multer ({storage,fileFilter});
module.exports = uploadFiles;