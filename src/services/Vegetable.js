import slug from 'slug'

export const slugify = (vegetable) => {
  return `${slug(vegetable.name)}-${vegetable.id}`
}

export const getIdFromSlug = (slug) => {
  if (typeof slug !== 'string') return null
  return parseInt(slug.split('-').pop(), 10)
}
