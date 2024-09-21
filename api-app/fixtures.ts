import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('users');
  } catch (error) {
    console.log('Collections were not present, skipping drop...');
  }

  const [johnUser, saraUser] = await User.create({
      username: 'John Doe',
      password: '123qwe',
      token: crypto.randomUUID()
    }, {
      username: 'Sara Conor',
      password: '456qwe',
      token: crypto.randomUUID()
    }
  );
  await db.close();
};

run().catch(console.error);