const vegetableList = [
  {
    name: 'Arroche',
    urlName: 'arroche',
    category: 'Plante vivace',
    img: 'https://media.ooreka.fr/public/image/plant/147/mainImage-source-11445372.jpg'
  },
  {
    name: 'Artichaut',
    urlName: 'artichaut',
    category: 'Plante bulbeuse',
    img: 'https://media.ooreka.fr/public/image/plant/82/furtherImage/e1hqbde1u7wcgwg0ssscco840-source-9415789.jpg'
  },
  {
    name: 'Aubergine',
    urlName: 'aubergine',
    category: 'Plante vivace',
    img: 'http://plantestropicalesdelestrade.com/57-home_default/aubergine-plant.jpg'
  },
  {
    name: 'Baselle',
    urlName: 'baselle',
    category: 'Plante graminée',
    img: 'http://www.calendrier-lunaire.fr/wp-content/uploads/2016/06/baselle-culture.jpg'
  },
  {
    name: 'Betterave',
    urlName: 'betterave',
    category: 'Plante vivace',
    img: 'https://i.ytimg.com/vi/GRo8hh0V2AE/maxresdefault.jpg'
  },
  {
    name: 'Cardon',
    urlName: 'cardon',
    category: 'Plante graminée',
    img: 'https://media.ooreka.fr/public/image/plant/318/furtherImage/78zmyv1stdogogg0o4sggswo4-source-11702414.jpg'
  },
  {
    name: 'Carotte',
    urlName: 'carotte',
    category: 'Plante bulbeuse',
    img: 'http://ressources.jardinage.eu/images/article/carotte.jpg'
  },
  {
    name: 'Céleri',
    urlName: 'celeri',
    category: 'Plante vivace',
    img: 'http://img.deco.fr/029E017005098695-c1-photo-oYToxOntzOjE6InciO2k6NjcwO30%3D-celeri.jpg'
  }
]

export const get = (query) => {
  return Promise.resolve(vegetableList)
}

export const getByUrlName = (urlName) => {
  return Promise.resolve(vegetableList.find((vegetable => vegetable.urlName === urlName)))
}
