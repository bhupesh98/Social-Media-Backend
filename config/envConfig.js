const isLocalHost = process.env.NODE_ENV === "localhost";
const isRender = process.env.NODE_ENV === "render";
const websiteURL = isLocalHost ? `localhost:${process.env.PORT}` : isRender ? `https://webd-selection-task-2.onrender.com` : null;

module.exports = websiteURL;