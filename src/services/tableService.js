import { addTable, findTable, findTableByInvitationToken } from '../repositories/tableRepository.js'

function createTable(name) {
    return addTable(name);
}

function getTable(tableId) {
    return findTable(tableId);
}

function getTableByInvitationToken(invitationToken) {
    return findTableByInvitationToken(invitationToken);
}

export { createTable, getTable, getTableByInvitationToken }