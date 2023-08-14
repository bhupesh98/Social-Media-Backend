const jwt = require('jsonwebtoken');

const authToken = (req,res,next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized User"
            });
        }
        // To omit Bearer line and directly get token (Bearer ......(token))
        token = token.split(' ').at(1);
        let user = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userId = user.userId;
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Unauthorized User or token not sent properly"
        });
    }
}

module.exports = authToken;