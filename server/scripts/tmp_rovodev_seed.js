// Temporary seed script
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../config/config.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Product = require('../models/productModel');
const User = require('../models/userModel');

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI not set. Please set it in server/config/config.env or server/.env');
    process.exit(1);
  }
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Seed admin if not exists
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
  const adminPass = process.env.SEED_ADMIN_PASSWORD || 'Password123!';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: 'Admin',
      email: adminEmail,
      gender: 'other',
      password: adminPass,
      role: 'admin',
      avatar: { public_id: 'placeholder', url: 'https://via.placeholder.com/150' },
    });
    console.log('Admin user created:', adminEmail);
  } else {
    console.log('Admin user exists:', adminEmail);
  }

  // Seed products if collection empty
  const count = await Product.countDocuments();
  if (count === 0) {
    const sample = [
      {
        name: 'Sample Property 1',
        description: 'A lovely sample property for demo.',
        highlights: ['Great location', 'Spacious rooms'],
        specifications: [
          { title: 'Bedrooms', description: '3' },
          { title: 'Bathrooms', description: '2' }
        ],
        price: 250000,
        cuttedPrice: 270000,
        images: [ { public_id: 'p1', url: 'https://picsum.photos/seed/p1/600/400' } ],
        brand: { name: 'Demo Realty', logo: { public_id: 'b1', url: 'https://via.placeholder.com/64' } },
        category: 'residential',
        stock: 5,
        warranty: 1,
        ratings: 4.5,
        numOfReviews: 0,
        user: admin._id,
      },
      {
        name: 'Sample Property 2',
        description: 'Another sample property for demo.',
        highlights: ['Modern design', 'Near amenities'],
        specifications: [
          { title: 'Bedrooms', description: '2' },
          { title: 'Bathrooms', description: '1' }
        ],
        price: 180000,
        cuttedPrice: 200000,
        images: [ { public_id: 'p2', url: 'https://picsum.photos/seed/p2/600/400' } ],
        brand: { name: 'Demo Realty', logo: { public_id: 'b1', url: 'https://via.placeholder.com/64' } },
        category: 'residential',
        stock: 3,
        warranty: 1,
        ratings: 4.2,
        numOfReviews: 0,
        user: admin._id,
      }
    ];
    await Product.insertMany(sample);
    console.log('Inserted sample products:', sample.length);
  } else {
    console.log('Products already present:', count);
  }

  await mongoose.disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
