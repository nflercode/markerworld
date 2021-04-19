import jwt from 'jsonwebtoken';

function generateAuthToken(payload) {
    return jwt.sign(payload, process.env.JWT_AUTH_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '3d' });
}

function verifyAuthToken(token) {
    return jwt.verify(token, process.env.JWT_AUTH_SECRET);
}

function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

export {
    generateAuthToken,
    verifyAuthToken,
    generateRefreshToken,
    verifyRefreshToken
}