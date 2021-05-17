import { v4 as uuidv4 } from 'uuid'

const tables = [];
let id = 1;

function addTable(name) {
    const newTable = {
        id: id++,
        name,
        invitationToken: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: null
    }

    tables.push(newTable);

    return newTable;
}

function findTable(tableId) {
    return tables.find(t => t.id === tableId);
}

function findTableByInvitationToken(invitationToken) {
    return tables.find(t => t.invitationToken === invitationToken);
}

function changeTableName(tableId, name) {
    const index = tables.findIndex((t) => t.id === tableId);
    if (index < 0)
        return false;

    tables[index] = {
        ...tables[index],
        updatedAt: new Date().toISOString(),
        name
    };

    return tables[index];
}

export default { addTable, findTable, findTableByInvitationToken, changeTableName }