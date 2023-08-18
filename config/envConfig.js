const isRender = process.env.NODE_ENV === "render";
const websiteURL = isRender ? `https://webd-selection-task-2.onrender.com` : `localhost:${process.env.PORT}`;

module.exports = websiteURL;