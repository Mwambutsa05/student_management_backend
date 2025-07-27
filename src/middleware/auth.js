const { verifyToken } = require('../config/jwt');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        req.user = verifyToken(token);
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
