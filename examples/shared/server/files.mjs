import { open } from 'node:fs/promises'
import { resolve } from 'node:path'

/**
 * @param  {...string[]} pathSegments
 * @returns {Promise<Buffer>}
 */
export async function read(...pathSegments) {
  try {
    const file = await open(resolve(import.meta.dirname, ...pathSegments), 'r')
    const content = await file.readFile()
    await file.close()
    return content
  } catch (error) {
    console.error(error)
    throw error
  }
}
