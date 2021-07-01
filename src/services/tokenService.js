import refreshTokenRepository from '../repositories/refreshTokenRepository.js';
import { generateAuthToken, generateRefreshToken } from '../jwt/tokenHandler.js'
import bcrypt from 'bcrypt';

function createAuthToken(playerId, tableId) {
    const authToken = generateAuthToken({ playerId, tableId });
    return authToken;
}

async function createRefreshToken(playerId, tableId) {
    const refreshToken = generateRefreshToken({ playerId, tableId });

    const hashedRefreshToken = await bcrypt.hash(refreshToken.token, 10);
    await refreshTokenRepository.addRefreshToken(hashedRefreshToken, playerId);
    return refreshToken;
}

async function compareRefreshToken(playerId, refreshToken) {
    const storedRefreshToken = await refreshTokenRepository.findRefreshToken(playerId);
    return await bcrypt.compare(refreshToken, storedRefreshToken.refreshToken);
}

async function removeRefreshToken(playerId) {
    try {
        return await refreshTokenRepository.deleteRefreshToken(playerId);
    } catch (err) {
        console.error('FAILED TO DELETE REFRESH TOKEN', playerId, err);
    }
}

export {
    createRefreshToken,
    compareRefreshToken,
    removeRefreshToken,
    createAuthToken
}