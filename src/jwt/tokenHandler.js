import jwt from 'jsonwebtoken';

function generateAuthToken(payload) {
	try {
		const token = jwt.sign(payload, process.env.JWT_AUTH_SECRET, { expiresIn: '15m' });
		const expiresAt = new Date(new Date().getTime() + 15 * 60000);
		return {
			token,
			expiresAt 
		}
	} catch (err) {
		console.error('Failed to sign auth token', err);
	}
}

function generateRefreshToken(payload) {
	try {
		const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '3d' });
		const date = new Date();
		const expiresAt = new Date(date.setDate(date.getDate() + 3));

		return {
			token,
			expiresAt
		}
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