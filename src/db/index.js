import mongoose from 'mongoose';
import { urlDb } from '../config';

mongoose.connect(urlDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', async () => {
  // we're connected!

  console.log('database connected');
});

export default db;
