import fastify, { FastifyInstance } from 'fastify';

import nextPlugin from '../server/plugins/next';

export default async (): Promise<FastifyInstance> => {
  const server = fastify({ logger: true });

  await server.register(nextPlugin);

  return server;
};
