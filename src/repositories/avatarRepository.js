import thinky from 'thinky';
import dbConfig from '../database/rdbConfig.js';

const t = thinky(dbConfig);

const Avatar = t.createModel('Avatar', {
  id: t.type.string(),
  name: t.type.string(),
  imageName: t.type.string()
});

const avatars = [
  {
    name: 'Egirl Elin',
    imageName: 'egirl-elin.jpg'
  },
  {
    name: 'Förmögne Fredrik',
    imageName: 'formogne-fredrik.jpg'
  },
  {
    name: 'Groteska Gusten',
    imageName: 'groteska-gusten.jpg'
  },
  {
    name: 'Hårige Harriette',
    imageName: 'harige-harriette.jpg'
  },
  {
    name: 'Ostiga Omar',
    imageName: 'ostiga-omar.jpg'
  },
  {
    name: 'Pundar Pontus',
    imageName: 'pundar-pontus.jpg'
  },
  {
    name: 'Sliskige Stefan',
    imageName: 'sliskiga-stefan.jpg'
  }
];

async function debugSetupAvatars() {
  const result = await Avatar.save(avatars);
  console.log('Avatars created');
  return result;
}

async function getAll() {
  return Avatar.run();
}

function getAvatar(avatarId) {
  return Avatar.get(avatarId).run();
}

export default { getAll, getAvatar, debugSetupAvatars, Avatar }