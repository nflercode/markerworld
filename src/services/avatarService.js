import avatarRepository from '../repositories/avatarRepository.js';

function getRandomAvatar(ignoreIds = []) {
  let allAvatars = avatarRepository.getAll();
  if (ignoreIds.length > 0)
    allAvatars = allAvatars.filter(avatar => !ignoreIds.includes(avatar.id));

  const randomIndex = Math.floor(Math.random() * allAvatars.length);
  return allAvatars[randomIndex];
}

function getAvatar(avatarId) {
  return avatarRepository.getAvatar(avatarId);
}

export default { getRandomAvatar, getAvatar };