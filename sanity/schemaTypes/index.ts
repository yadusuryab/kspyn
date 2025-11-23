import { type SchemaTypeDefinition } from 'sanity'
import client from './client'
import onboard from './onboard'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [client, onboard],
}
