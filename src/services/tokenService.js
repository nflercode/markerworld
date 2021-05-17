import refreshTokenRepository from '../repositories/refreshTokenRepository.js'
import authExpireRepositry from '../repositories/authExpireRepository.js';
import { generateAuthToken, generateRefreshToken } from '../jwt/tokenHandler.js'

function createAuthToken(playerId, tableId) {
    const authToken = generateAuthToken({ playerId, tableId });
    const expiratioAsISO = authToken.expiresAt.toISOString();
    
    const expirationEntiy = authExpireRepositry.getExpiration(playerId);
    if (expirationEntiy) {
        console.log('Updating expirationtime for', playerId);
        authExpireRepositry.updateExpiration(expiratioAsISO, playerId);
    } else { 
        console.log('Adding expiration time for', playerId);
        authExpireRepositry.addAuthExpires(expiratioAsISO, playerId);
    }
    return authToken;
}

function createRefreshToken(playerId, tableId) {
    const refreshToken = generateRefreshToken({ playerId, tableId });
    refreshTokenRepository.addRefreshToken(refreshToken.token, playerId);
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

function getRefreshToken(playerId) {
    return refreshTokenRepository.findRefreshToken(playerId);
}

function removeRefreshToken(playerId) {
    return refreshTokenRepository.deleteRefreshToken(playerId)
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