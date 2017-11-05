import slug from 'slug'

export const slugify = (flower) => {
  return `${slug(flower.name)}-${flower.id}`
}

export const getIdFromSlug = (slug) => {
  if (typeof slug !== 'string') return null
  return parseInt(slug.split('-').pop(), 10)
}

export const typeLabels = {
  'VIVACE': 'Vivace',
  'ANNUELLE': 'Annuelle',
  'GRIMPANTE': 'Grimpante',
  'BISANNUELLE': 'Bisanuelle',
  'ANNUELLE / BISANNUELLE': 'Annuelle / bisanuelle',
  'BISANNUELLE / TRISANNUELLE': 'Bisanuelle / trisanuelle',
  'ANNUELLE / VIVACE': 'Annuelle / vivace',
  'ARBUSTE OU ARBRISSEAU': 'Arbuste ou arbrisseau',
  'VIVACE / ARBUSTE OU ARBRISSEAU': 'Vivace / arbuste ou arbrisseau',
  'BISANNUELLE / VIVACE': 'Bisanuelle / vivace',
  'ANNUELLE / GRIMPANTE': 'Annuelle / grimpante',
  'VIVACE / GRIMPANTE': 'Vivace / grimpante'
}
