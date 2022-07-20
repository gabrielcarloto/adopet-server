const pets = [
  {
    createdAt: Date.now(),
    id: 1,
    name: 'nilsinho',
    image: 'nilsinho.png',
    location: 'curitiba',
    description: {
      breed: 'cachorrão',
      age: '6 meses',
      size: '8 metros',
      behaviour: 'fofo :3',
    },
  },
  {
    createdAt: Date.now(),
    id: 2,
    name: 'astolfo',
    image: 'astolfo.png',
    location: 'curitiba',
    description: {
      breed: 'cachorrão',
      age: '6 anos',
      size: '8 cm',
      behaviour: 'bavo >:(',
    },
  },
  {
    createdAt: Date.now(),
    id: 3,
    name: 'afonso',
    image: 'afonso.png',
    location: 'curitiba',
    description: {
      breed: 'gato.',
      age: '2 anos',
      size: 'médio',
      behaviour: 'ele não liga pra vc.',
    },
  },
];

export default pets;
