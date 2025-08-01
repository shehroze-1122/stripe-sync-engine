'use strict'
import { FastifyInstance } from 'fastify'
import { beforeAll, describe, test, expect, afterAll } from 'vitest'
import { createServer } from '../app'

describe('/health', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = await createServer()
  })

  afterAll(async () => {
    await server.close()
  })

  test('is alive', async () => {
    const response = await server.inject({
      url: `/health`,
      method: 'GET',
    })
    const json = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(json).toMatchObject({ received: true })
  })
})
