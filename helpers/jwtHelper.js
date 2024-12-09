const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (userId, role) => {
        return new Promise((resolve, reject) => {
            const payload = { userId, role };
            const secretKey = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "1y",
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
    }
}