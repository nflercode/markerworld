import playerRepository from '../repositories/playerRepository.js';
import avatarService from './avatarService.js';

function createPlayer(tableId, name) {
    const avatar = avatarService.getRandomAvatar();
    const player = playerRepository.addPlayer(tableId, name, avatar.id);

    return {
        ...player,
        avatar
    }
}

function getPlayers(tableId) {
    const players = playerRepository.findPlayers(tableId);
    return players.map((player) => ({
        ...player,
        avatar: avatarService.getAvatar(player.avatarId)
    }));
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