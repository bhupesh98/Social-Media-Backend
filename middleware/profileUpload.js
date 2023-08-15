const multer = require('multer');

const getFileType = (file) => {
    return  file.mimetype.split('/').pop();
}

const generateFileName = (req,file,cb) => {
    const filename ="profilePhoto-" + req.userId + "." + getFileType(file);
    req.body.profilePicture = `localhost:${process.env.PORT}/uploads/profilePhoto/${filename}`
    cb(null,filename);
}

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/profilePhoto");
    },
    filename: generateFileName
    
});

const upload = multer({
    storage: fileStorageEngine,
    fileFilter: (req, file, cb) => {
        const allowedType = /jpeg|jpg|png/;

        if(allowedType.test(getFileType(file))){
        return cb(null, true)
        }
        return cb(null, false)
    }
});

module.exports = upload;