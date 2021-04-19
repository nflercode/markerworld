import {
    addRefreshToken,
    findRefreshToken,
    deleteRefreshToken
} from '../repositories/refreshTokenRepository.js'
import { generateAuthToken, generateRefreshToken } from '../jwt/tokenHandler.js'

function createAuthToken(playerId, tableId) {
    return generateAuthToken({ playerId, tableId });
}

function createRefreshToken(playerId, tableId) {
    const refreshToken = generateRefreshToken({ playerId, tableId });
    addRefreshToken(refreshToken, playerId);
    return refreshToken;
}

function getRefreshToken(playerId) {
    return findRefreshToken(playerId);
}

function removeRefreshToken(playerId) {
    deleteRefreshToken(playerId)
}

export { createRefreshToken, getRefreshToken, removeRefreshToken, createAuthToken }