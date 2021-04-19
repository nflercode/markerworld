const refreshTokens = [];
let id = 1;

function addRefreshToken(refreshToken, playerId) {
    const newRefreshToken = {
        id: id++,
        playerId,
        refreshToken
    };

    refreshTokens.push(newRefreshToken);

    return newRefreshToken;
}

function findRefreshToken(playerId) {
    return refreshTokens.find(t => t.playerId == playerId);
}

function deleteRefreshToken(playerId) {
    const indexToRemove = refreshTokens.findIndex(t => t.playerId == playerId);
    refreshTokens.splice(indexToRemove, 1);
}

export { addRefreshToken, findRefreshToken, deleteRefreshToken }