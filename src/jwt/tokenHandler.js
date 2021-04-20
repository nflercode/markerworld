import jwt from 'jsonwebtoken';

function generateAuthToken(payload) {
	try {
		return jwt.sign(payload, process.env.JWT_AUTH_SECRET, { expiresIn: '15m' });
	} catch (err) {
		console.error('Failed to sign auth token', err);
	}
}

function generateRefreshToken(payload) {
	try {
		return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '3d' });
	} catch (err) {
		console.error('Failed to sign refresh token', err);
	}
}

function verifyAuthToken(token) {
	try {
		return jwt.verify(token, process.env.JWT_AUTH_SECRET);
	} catch (err) {
		console.error('Failed to verify auth token', err);
	}
}

function verifyRefreshToken(token) {
	try {
		return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
	} catch (err) {
		console.error('Failed to verify refresh token', err);
	}
}

export {
	generateAuthToken,
	verifyAuthToken,
	generateRefreshToken,
	verifyRefreshToken
}