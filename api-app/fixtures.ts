import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Category from './models/Category';
import Product from './models/Product';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('products');
  } catch (error) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user1, user2] = await User.create({
      username: 'user1',
      password: '123qwe',
      name: 'John Doe',
      phoneNumber: '+999 555 555 000',
      token: crypto.randomUUID()
    }, {
      username: 'user2',
      password: '123qwe',
      name: 'Sara Conor',
      phoneNumber: '+999 555 000 000',
      token: crypto.randomUUID()
    }
  );

  const [category1, category2, category3, category4, category5] = await Category.create({
      title: 'Fresh Produce'
    }, {
      title: 'Dairy & Eggs'
    }, {
      title: 'Bakery'
    }, {
      title: 'Meat & Seafood'
    }, {
      title: 'Pantry Staples'
    },
  );

  await Product.create({
      category: category1,
      user: user1,
      title: 'Apple',
      description: 'Fresh, crisp apples perfect for snacking or baking.',
      price: 100,
      image: 'fixtures/apple.jpg'
    }, {
      category: category1,
      user: user2,
      title: 'Carrot',
      description: 'Organic carrots, rich in vitamins and great for soups.',
      price: 30,
      image: 'fixtures/carrot.jpg'
    }, {
      category: category2,
      user: user1,
      title: 'Milk',
      description: 'Fresh whole milk, sourced from local farms.',
      price: 60,
      image: 'fixtures/milk.jpg'
    }, {
      category: category2,
      user: user2,
      title: 'Eggs',
      description: 'Free-range eggs, packed with protein and nutrients.',
      price: 130,
      image: 'fixtures/eggs.jpg'
    }, {
      category: category3,
      user: user1,
      title: 'Bread',
      description: 'Artisan sourdough bread with a crisp crust and soft inside.',
      price: 70,
      image: 'fixtures/bread.jpg'
    }, {
      category: category3,
      user: user2,
      title: 'Croissant',
      description: 'Flaky and buttery croissants, perfect for breakfast.',
      price: 120,
      image: 'fixtures/croissant.jpg'
    }, {
      category: category4,
      user: user1,
      title: 'Chicken Wings',
      description: 'Fresh chicken wings, perfect for grilling or frying.',
      price: 320,
      image: 'fixtures/chickenwings.jpg'
    }, {
      category: category4,
      user: user2,
      title: 'Salmon Fillet',
      description: 'Fresh Atlantic salmon fillets, rich in omega-3.',
      price: 900,
      image: 'fixtures/salmon.jpg'
    }, {
      category: category5,
      user: user1,
      title: 'Rice',
      description: 'Long-grain white rice, a versatile pantry staple.',
      price: 130,
      image: 'fixtures/rice.jpg'
    }, {
      category: category5,
      user: user2,
      title: 'Olive Oil',
      description: 'Extra virgin olive oil, cold-pressed and full of flavor.',
      price: 530,
      image: 'fixtures/oliveoil.jpg'
    },
  );

  await db.close();
};

run().catch(console.error);