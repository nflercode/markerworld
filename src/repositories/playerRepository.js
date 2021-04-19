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
    players.splice(indexToRemove, 1);
}

function findPlayers(tableId) {
    return players.filter(p => p.tableId == tableId);
}

export { addPlayer, deletePlayer, findPlayers }