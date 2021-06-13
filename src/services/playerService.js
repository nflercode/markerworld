import playerRepository from '../repositories/playerRepository.js';
import avatarService from './avatarService.js';

async function createPlayer(tableId, name) {
    const playersInTable = await getPlayers(tableId);
    const avatar = await avatarService.getRandomAvatar(playersInTable.map(p => p.avatarId));

    try {
        const player = await playerRepository.addPlayer(tableId, name, avatar.id);
        return player;
    } catch (err) {
        console.error('FAILED TO CREATE PLAYER', err);
    }
}

async function getPlayers(tableId) {
    const players = await playerRepository.findPlayers(tableId);
    return players;
}

async function getPlayer(playerId) {
    return playerRepository.findPlayer(playerId);
}

async function removePlayer(playerId) {
    try {
        return await playerRepository.deletePlayer(playerId);
    } catch (err) {
        console.error('FAILED TO REMOVE PLAYER ', playerId, err);
    }
}

async function updatePlayerName(playerId, name) {
    const player = await playerRepository.setPlayerName(playerId, name);
    return player
}

export { createPlayer, removePlayer, getPlayers, getPlayer, updatePlayerName }