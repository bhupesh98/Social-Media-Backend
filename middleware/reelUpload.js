const multer = require('multer');

const getFileType = (file) => {
    return file.mimetype.split('/').pop();
}

const generateFileName = (req,file,cb) => {
    const filename = Date.now() + "-reel-" + req.userId + "." + getFileType(file);
    req.reelURL = `localhost:${process.env.PORT}/uploads/reels/${filename}`;
    cb(null,filename);
}

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/reels");
    },
    filename: generateFileName
    
});

const upload = multer({
    storage: fileStorageEngine,
    fileFilter: (req, file, cb) => {
        const allowedType = /mp4|mkv|mov|webm/;

        if(allowedType.test(getFileType(file))){
        return cb(null, true)
        }
        return cb(null, false)
    }
});

module.exports = upload;