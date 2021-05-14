import playerRepository from '../repositories/playerRepository.js';

function createPlayer(tableId, name) {
    return playerRepository.addPlayer(tableId, name);
}

function getPlayers(tableId) {
    return playerRepository.findPlayers(tableId);
}

function getPlayer(playerId) {
    return playerRepository.findPlayer(playerId);
}

function removePlayer(playerId) {
    return playerRepository.deletePlayer(playerId);
}

function updatePlayerName(playerId, name) {
    return playerRepository.setPlayerName(playerId, name);
}

export { createPlayer, removePlayer, getPlayers, getPlayer, updatePlayerName }