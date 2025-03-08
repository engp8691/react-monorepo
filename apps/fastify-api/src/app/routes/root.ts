import { FastifyInstance } from 'fastify';
import httpErrors from 'http-errors';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    return { message: 'Hello API' };
  });

  fastify.get('/api/greeting', async (request, reply) => {
    try {
      return reply.code(200).send({ greeting: 'hello' });
    } catch (error) {
      console.log(999912, error)
      return reply.code(500).send(httpErrors(500, "Internal Server Error"));
    }
  });
}
