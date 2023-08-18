const DataUriParser = require('datauri/parser');
const getFileType = (file) => {
    return  file.mimetype.split('/').pop();
}

const getDataURI = async (file) => {
    const parser = new DataUriParser();
    return parser.format(getFileType(file),file.buffer);
}

module.exports = getDataURI;