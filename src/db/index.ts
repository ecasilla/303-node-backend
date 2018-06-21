import * as knex from 'knex';

import { config } from '../config';

const db = knex({
  client: 'pg',
  connection: config.db,
  pool: config.db.pool,
}) as knex;

export default db;
