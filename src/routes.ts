/**
 * Main application routes
 */
import * as path from 'path';

import { Application } from 'express';

import todos from './api/todos';
import errors from './components/errors';
import { config } from './config';

export default function router(app: Application) {
    // Insert routes below
  app.use('/api/todos', todos);

    // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|views|assets)/*').get(errors[404](404));

    // All other routes should redirect to the index.html
  app.route('/*')
        .get((_, res) => {
          res.sendFile(path.resolve(`${config.root}/views/index.html`));
        });
}
