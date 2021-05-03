import fastify, { FastifyInstance } from 'fastify';

import nextPlugin from './plugins/next';
import routes from './routes';

export default async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: {
      prettyPrint: true,
      level: 'debug',
    },
  });

  await server.register(routes);
  await server.register(nextPlugin);

  return server;
};
