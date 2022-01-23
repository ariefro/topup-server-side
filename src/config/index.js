import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

module.exports = {
  serviceName: process.env.SERVICE_NAME,
  urlDb: process.env.MONGO_URL,
  rootPath: path.resolve(__dirname, '../../'),
};
