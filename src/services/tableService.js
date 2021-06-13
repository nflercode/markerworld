import tableRepository from '../repositories/tableRepository.js'

async function createTable(name) {
    try {
        return await tableRepository.addTable(name);
    } catch (err) {
        console.error('FAILED TO SAVE TABLE: ', err);
    }
}

async function getTable(tableId) {
    try {
        return await tableRepository.findTable(tableId);
    } catch (err) {
        console.error('Failed to get table ',  tableId, err);
    }
}

async function setTableName(tableId, name) {
    try {
        return tableRepository.changeTableName(tableId, name);
    } catch (err) {
        console.error('Failed to update name of table', err);
    }
}

async function getTableByInvitationToken(invitationToken) {
    try {
        return await tableRepository.findTableByInvitationToken(invitationToken);
    } catch (err) {
        console.error('FAILED TO GET BY INV TOKEN', err);
    }
}

export { createTable, getTable, getTableByInvitationToken, setTableName }