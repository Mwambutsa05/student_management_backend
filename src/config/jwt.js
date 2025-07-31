// src/config/jwt.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./env');

function generateToken(payload) {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Ensure payload has required fields
    const tokenPayload = {
        id: payload.id || payload.userId,
        email: payload.email,
        role: payload.role || 'student',
        fullName: payload.fullName,
        ...payload
    };

    console.log('🔐 Generating token for user:', tokenPayload.id);

    return jwt.sign(tokenPayload, JWT_SECRET, {
        expiresIn: '1d',
        issuer: 'student-management-api',
        audience: 'student-management-client'
    });
}

function verifyToken(token) {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    if (!token) {
        throw new Error('Token is required');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET, {
            issuer: 'student-management-api',
            audience: 'student-management-client'
        });

        console.log('✅ Token verified for user:', decoded.id);
        return decoded;
    } catch (error) {
        console.error(' Token verification failed:', error.message);
        throw new Error('Invalid or expired token');
    }
}

function extractTokenFromHeader(authHeader) {
    if (!authHeader) {
        return null;
    }

    if (authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    return authHeader;
}

module.exports = {
    generateToken,
    verifyToken,
    extractTokenFromHeader
};