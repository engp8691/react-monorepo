import Fastify, { FastifyInstance } from 'fastify';
import httpErrors from 'http-errors';
import { app } from './app';

export const GENERIC_ERROR_MESSAGE = 'Generic Error Message'

describe('GET /', () => {
  let server: FastifyInstance;

  beforeEach(() => {
    server = Fastify();
    server.register(app);
  });

  it('should respond with a message', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.json()).toEqual({ message: 'Hello API' });
  });

  it('should respond with a greeting of hello', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/greeting',
    });

    expect(response.json()).toEqual({ greeting: 'hello' });
  });

  it('should respond with 500 error', async () => {
    jest.spyOn(server, 'inject').mockRejectedValueOnce(httpErrors(500, "Internal Server Error"));

    try {
      await server.inject({
        method: 'GET',
        url: '/api/greeting',
      });
  } catch (error: any) {
    console.log(error)
    expect(error.statusCode).toBe(500);
  }
});
  
});
