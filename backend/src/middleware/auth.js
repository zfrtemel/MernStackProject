const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("jwt token missmatch");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).send("Token Geçersiz");
    }
};

module.exports = verifyToken;