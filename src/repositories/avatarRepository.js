const avatars = [
  {
    id: 1,
    name: 'Egirl Elin',
    imageName: 'egirl-elin.jpg'
  },
  {
    id:2,
    name: 'Förmögne Fredrik',
    imageName: 'formogne-fredrik.jpg'
  },
  {
    id: 3,
    name: 'Groteska Gusten',
    imageName: 'groteska-gusten.jpg'
  },
  {
    id: 4,
    name: 'Hårige Harriette',
    imageName: 'harige-harriette.jpg'
  },
  {
    id: 5,
    name: 'Ostiga Omar',
    imageName: 'ostiga-omar.jpg'
  },
  {
    id: 6,
    name: 'Pundar Pontus',
    imageName: 'pundar-pontus.jpg'
  },
  {
    id: 7,
    name: 'Sliskige Stefan',
    imageName: 'sliskiga-stefan.jpg'
  }
];

function getAll() {
  return avatars;
}

function getAvatar(avatarId) {
  return avatars.find((avatar) => avatar.id === avatarId);
}

export default { getAll, getAvatar }