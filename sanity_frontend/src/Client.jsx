import sanityClient from '@sanity/client'
import imageUrlBuilder  from '@sanity/image-url'

export const client = sanityClient({
  projectId: 'nhe79ga6',
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
  token: 'skdiaTlvBOw4WJUL4QBpstfCIcsW1JTsi20IoJzS0d140ItQnhgQblGejDdao9JLKn2awJdc5sQJjfVwHqHxHChNfU9QyEEUL8ZAzG4p1xAQDkoAh7vEyW1TXKdgnBY7GMJmMt6Rq0zW2MmjdqQzUpGJL35QiFdwr8HZVW59tBObSLmb0Uqa',
  ignoreBrowserTokenWarning: true,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)