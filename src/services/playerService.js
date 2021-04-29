import { addPlayer, deletePlayer, findPlayers } from '../repositories/playerRepository.js';

function createPlayer(tableId, name) {
    return addPlayer(tableId, name);
}

function getPlayers(tableId) {
    return findPlayers(tableId);
}

function removePlayer(playerId) {
    return deletePlayer(playerId);
}

export { createPlayer, removePlayer, getPlayers }