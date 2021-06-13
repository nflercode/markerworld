import thinky from 'thinky';
import dbConfig from '../database/rdbConfig.js';

const t = thinky(dbConfig);
const r = t.r;

const RefreshToken = t.createModel('RefreshToken', {
  id: t.type.string(),
  playerId: t.type.string(),
  refreshToken: t.type.string(),
  createdAt: t.type.date().default(r.now())
});

async function addRefreshToken(refreshToken, playerId) {
    const newRefreshToken = new RefreshToken({
        playerId,
        refreshToken
    });

    return RefreshToken.save(newRefreshToken);
}

async function findRefreshToken(playerId) {
    return RefreshToken.filter({ playerId }).then(token => token[0]);
}

async function deleteRefreshToken(playerId) {
    await RefreshToken.filter({ playerId }).delete().run();
    return true;
}

export default { addRefreshToken, findRefreshToken, deleteRefreshToken }