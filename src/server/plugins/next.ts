/* eslint-disable @typescript-eslint/no-explicit-any */
import fp from 'fastify-plugin';
import Next from 'next';

import type { ServerResponse } from 'http';
import type { FastifyInstance, RegisterOptions } from 'fastify';

export default fp(
  async (
    fastify: FastifyInstance,
    _: RegisterOptions,
    next: (err?: Error) => void,
  ): Promise<void> => {
    const dev = process.env.NODE_ENV !== 'production';
    const app = Next({
      dev,
      dir: './src/client',
    });
    const handle = app.getRequestHandler();

    // Don't await on "prepare" as this takes longer
    // than th AVVIO_PLUGIN_TIMEOUT thus causing:
    // Error: ERR_AVVIO_PLUGIN_TIMEOUT: plugin did not start in time
    app.prepare();

    if (dev) {
      fastify.get('/_next/*', (req, reply) => {
        return handle(req.req, (reply as any).res as ServerResponse).then(
          () => {
            reply.sent = true;
          },
        );
      });
    }

    fastify.all('/*', (req, reply) => {
      return handle(req.req, (reply as any).res as ServerResponse).then(() => {
        reply.sent = true;
      });
    });

    fastify.setNotFoundHandler((request, reply) => {
      return app
        .render404(request.req, (reply as any).res as ServerResponse)
        .then(() => {
          reply.sent = true;
        });
    });

    next();
  },
  {
    name: 'next',
  },
);
