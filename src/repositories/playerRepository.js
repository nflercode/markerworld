const players = [];
let id = 1;

function addPlayer(tableId, name) {
    const newPlayer = {
        id: id ++,
        tableId,
        name,
        createdAt: new Date().toISOString(),
        updatedAt: null
    };

    players.push(newPlayer);

    return newPlayer;
}

function deletePlayer(playerId) {
    const indexToRemove = players.findIndex(p => p.id === playerId);
    if (indexToRemove === -1)
        return false;

    players.splice(indexToRemove, 1);
    return true;
}

function findPlayers(tableId) {
    return players.filter(p => p.tableId === tableId);
}

function findPlayer(playerId) {
    return players.find(p => p.id === playerId);
}

function setPlayerName(playerId, name) {
    const index = players.findIndex((p) => p.id === playerId);
    if (index < 0)
        return false;

    players[index] = {
        ...players[index],
        updatedAt: new Date().toISOString(),
        name
    };

    return players[index];
}

export { addPlayer, deletePlayer, findPlayers, findPlayer, setPlayerName }