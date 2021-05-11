import { addTable, findTable, findTableByInvitationToken, changeTableName } from '../repositories/tableRepository.js'

function createTable(name) {
    return addTable(name);
}

function getTable(tableId) {
    return findTable(tableId);
}

function setTableName(tableId, name) {
    return changeTableName(tableId, name);
}

function getTableByInvitationToken(invitationToken) {
    return findTableByInvitationToken(invitationToken);
}

export { createTable, getTable, getTableByInvitationToken, setTableName }