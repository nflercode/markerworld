import avatarRepository from '../repositories/avatarRepository.js';

async function getRandomAvatar(ignoreIds = []) {
  let allAvatars = await avatarRepository.getAll();
  if (ignoreIds.length > 0)
    allAvatars = allAvatars.filter(avatar => !ignoreIds.includes(avatar.id));

  const randomIndex = Math.floor(Math.random() * allAvatars.length);
  return allAvatars[randomIndex];
}

async function getAvatar(avatarId) {
  return avatarRepository.getAvatar(avatarId);
}

async function setupAvatarsDebug() {
  return avatarRepository.debugSetupAvatars();
}

export default { getRandomAvatar, getAvatar, setupAvatarsDebug };