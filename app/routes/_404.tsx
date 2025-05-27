import type { NotFoundHandler } from 'hono'
import { NotFound } from '../components'

const handler: NotFoundHandler = (c) => {
  c.status(404)
  return c.render(
    <NotFound />
  )
}

export default handler
