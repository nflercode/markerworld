import tableRepository from '../repositories/tableRepository.js'

function createTable(name) {
    return tableRepository.addTable(name);
}

function getTable(tableId) {
    return tableRepository.findTable(tableId);
}

function setTableName(tableId, name) {
    return tableRepository.changeTableName(tableId, name);
}

function getTableByInvitationToken(invitationToken) {
    return tableRepository.findTableByInvitationToken(invitationToken);
}

export { createTable, getTable, getTableByInvitationToken, setTableName }