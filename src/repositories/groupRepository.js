import { v4 as uuidv4 } from 'uuid'

const groups = [];
let id = 1;

function addGroup(name) {
    const newGroup = {
        id: id++,
        name,
        invitationToken: generateInvitationToken(),
        createdAt: getDateNowISO()
    }

    groups.push(newGroup);

    return newGroup;
}

function getDateNowISO() {
    return new Date().toISOString();
}

function generateInvitationToken() {
    return uuidv4();
}

export { addGroup }