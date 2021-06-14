import thinky from 'thinky';
import dbConfig from '../database/rdbConfig.js';
import avatarRepository from './avatarRepository.js';

const t = thinky(dbConfig);
const r = t.r;

const Player = t.createModel('Player', {
  id: t.type.string(),
  tableId: t.type.string(),
  avatarId: t.type.string(),
  name: t.type.string().min(1),
  createdAt: t.type.date().default(r.now()),
  createdAt: t.type.date()
});

Player.hasOne(avatarRepository.Avatar, 'avatar', 'avatarId', 'id');

async function addPlayer(tableId, name, avatarId) {
    const newPlayer = new Player({
        tableId,
        avatarId,
        name,
        createdAt: t.type.date().default(r.now()),
        updatedAt: null
    });

    const savedPlayer = await Player.save(newPlayer);

    return Player.get(savedPlayer.id).getJoin({ avatar: true }).run();
}

async function deletePlayer(playerId) {
    await Player.get(playerId).delete().run();
    return true;
}

async function findPlayers(tableId) {
    return Player.filter({ tableId }).getJoin({ avatar: true }).run();
}

async function findPlayer(playerId) {
    return Player.get(playerId).getJoin({ avatar: true }).run();
}

async function setPlayerName(playerId, name) {
    return Player.get(playerId).update({ name }).run();
}

export default { addPlayer, deletePlayer, findPlayers, findPlayer, setPlayerName, Player }