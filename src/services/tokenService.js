import refreshTokenRepository from '../repositories/refreshTokenRepository.js'
import authExpireRepositry from '../repositories/authExpireRepository.js';
import { generateAuthToken, generateRefreshToken } from '../jwt/tokenHandler.js'

function createAuthToken(playerId, tableId) {
    const authToken = generateAuthToken({ playerId, tableId });
    const expirationAsISO = authToken.expiresAt.toISOString();
    
    const expirationEntiy = authExpireRepositry.getExpiration(playerId);
    if (expirationEntiy) {
        console.log('Updating expirationtime for', playerId);
        authExpireRepositry.updateExpiration(expirationAsISO, playerId);
    } else { 
        console.log('Adding expiration time for', playerId);
        authExpireRepositry.addAuthExpires(expirationAsISO, playerId);
    }
    return authToken;
}

async function createRefreshToken(playerId, tableId) {
    const refreshToken = generateRefreshToken({ playerId, tableId });
    await refreshTokenRepository.addRefreshToken(refreshToken.token, playerId);
    return refreshToken;
}

function getExpirationForAuth(playerId) {
    return authExpireRepositry.getExpiration(playerId);
}

function getEarliestExpiration() {
    return authExpireRepositry.getEarliestExpire();
}

function deleteExpirationForAuth(playerId) {
    return authExpireRepositry.deleteExpiration(playerId);
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
    createAuthToken,
    deleteExpirationForAuth,
    getExpirationForAuth,
    getEarliestExpiration
}