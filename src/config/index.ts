import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const config = {
  db: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX as string, 10),
      min: parseInt(process.env.DB_POOL_MIN as string, 10),
    },
    seed: false,
    user: process.env.DB_USER,
  },
  port: process.env.PORT,
  root: path.join(process.cwd(), 'dist'),
  serviceName: process.env.SERVICE_NAME,
};
