import refreshTokenRepository from '../repositories/refreshTokenRepository.js';
import { generateAuthToken, generateRefreshToken } from '../jwt/tokenHandler.js'

function createAuthToken(playerId, tableId) {
    const authToken = generateAuthToken({ playerId, tableId });
    return authToken;
}

async function createRefreshToken(playerId, tableId) {
    const refreshToken = generateRefreshToken({ playerId, tableId });
    await refreshTokenRepository.addRefreshToken(refreshToken.token, playerId);
    return refreshToken;
}

async function getRefreshToken(playerId) {
    return refreshTokenRepository.findRefreshToken(playerId);
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
    getRefreshToken,
    removeRefreshToken,
    createAuthToken
}