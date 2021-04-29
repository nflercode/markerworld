const authExpires = [];
let id = 1;

function addAuthExpires(expiresAt, playerId) {
  const newAuthExpires = {
      id: id++,
      expiresAt,
      playerId
  };

  authExpires.push(newAuthExpires);

  return newAuthExpires;
}

function getEarliestExpire() {
  if (authExpires.length === 0)
    return;

  return authExpires.reduce((p, c) => Date.parse(p.expiresAt) > Date.parse(c.expiresAt) ? c : p);
}

function getExpiration(playerId) {
  return authExpires.find((expires) => expires.playerId === playerId);
}

function updateExpiration(expiresAt, playerId) {
  const index = authExpires.findIndex((expires) => expires.playerId === playerId);
  if (index === -1)
    return false;

  const authExpiresEntity = authExpires[index];
  authExpires[index] = {
    ...authExpiresEntity,
    expiresAt
  }

  return authExpiresEntity;
}

function deleteExpiration(playerId) {
  const index = authExpires.findIndex((expires) => expires.playerId === playerId);
  if (index === -1)
    return false;

  authExpires.splice(index, 1);
  return true;
}

export default { addAuthExpires, getExpiration, updateExpiration, deleteExpiration, getEarliestExpire }