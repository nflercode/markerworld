import { addGroup } from '../repositories/groupRepository.js'

function createGroup(name) {
    return addGroup(name);
}

export { createGroup }