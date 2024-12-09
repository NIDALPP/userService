const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const verifyToken = (req, res, next, requiredRole) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return next(createError.Unauthorized("No authorization header"));

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return next(createError.Unauthorized("Invalid authorization header format"));
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return next(createError.Unauthorized(message));
            }

            const { role, userId } = payload;
            req.payload = payload;
            req.role = role;
            req.userId = userId;

            if (role !== requiredRole) {
                return res.status(403).json({ error: `Access forbidden: ${requiredRole}s only` });
            }

            next();
        });
    } catch (error) {
        next(createError.InternalServerError(error.message));
    }
};

module.exports = {
    adminAuth: (req, res, next) => verifyToken(req, res, next, 'admin'),
    userAuth: (req, res, next) => verifyToken(req, res, next, 'user'),
};
