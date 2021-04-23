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
    const indexToRemove = players.findIndex(p => p.playerId == playerId);
    if (indexToRemove == -1)
        return false;

    players.splice(indexToRemove, 1);
    return true;
}

function findPlayers(tableId) {
    return players.filter(p => p.tableId == tableId);
}

export { addPlayer, deletePlayer, findPlayers }