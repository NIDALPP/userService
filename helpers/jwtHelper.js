const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (userId, role) => {
        return new Promise((resolve, reject) => {
            const payload = { userId, role }; 
            const secretKey = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "1000s", 
                issuer: "node-auth",
                audience: userId,
            };

            jwt.sign(payload, secretKey, options, (err, token) => {
                if (err) {
                    console.error("JWT Signing Error:", err.message);
                    reject(createError.InternalServerError());
                    return;
                }
                resolve(token);
            });
        });
    },

    verifyAccessToken: (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) return next(createError.Unauthorized("No authorization header"));

            const bearerToken = authHeader.split(' ');
            if (bearerToken.length !== 2 || bearerToken[0] !== 'Bearer') {
                return next(createError.Unauthorized("Invalid authorization header format"));
            }

            const token = bearerToken[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                    return next(createError.Unauthorized(message));
                }
                req.payload = payload; 
                next();
            });
        } catch (error) {
            next(createError.InternalServerError(error.message));
        }
    }
};
