import { addPlayer, deletePlayer, findPlayers, findPlayer, setPlayerName } from '../repositories/playerRepository.js';

function createPlayer(tableId, name) {
    return addPlayer(tableId, name);
}

function getPlayers(tableId) {
    return findPlayers(tableId);
}

function getPlayer(playerId) {
    return findPlayer(playerId);
}

function removePlayer(playerId) {
    return deletePlayer(playerId);
}

function updatePlayerName(playerId, name) {
    return setPlayerName(playerId, name);
}

export { createPlayer, removePlayer, getPlayers, getPlayer, updatePlayerName }