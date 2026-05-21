import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Development from './models/Development.js';
import Unit from './models/Unit.js';

dotenv.config();

const developments = [
  {
    name: 'The Sky Gardens',
    description: 'Luxury living in the heart of Nine Elms with breathtaking views of the London skyline. Features a 24-hour concierge, private gym, and communal roof gardens.',
    address: { line1: '8 Sky Gardens Way', city: 'London', postcode: 'SW8 2BT' },
    location: { type: 'Point', coordinates: [-0.1245, 51.4852] },
    amenities: ['24/7 Concierge', 'Roof Garden', 'Gym', 'Cinema Room', 'Co-working Space'],
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', 'https://images.unsplash.com/photo-1460317442991-0ec239397118'],
    featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    developer: 'Vantage Point',
    minPrice: 2500,
    maxPrice: 6500,
    virtualTourUrl: 'https://my.matterport.com/show/?m=example1',
  },
  {
    name: 'Manchester Victoria Riverside',
    description: 'A striking new addition to the Manchester skyline, offering modern apartments with high-end finishes and exclusive resident facilities.',
    address: { line1: '1 Victoria Riverside', city: 'Manchester', postcode: 'M4 4AU' },
    location: { type: 'Point', coordinates: [-2.2426, 53.4808] },
    amenities: ['Private Gym', 'Resident Lounge', 'Bike Storage', 'Pet Spa', 'Yoga Studio'],
    images: ['https://images.unsplash.com/photo-1574362848149-11496d93a7c7', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'],
    featuredImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7',
    developer: 'Urban Living',
    minPrice: 1200,
    maxPrice: 3200,
    virtualTourUrl: 'https://my.matterport.com/show/?m=example2',
  },
  {
    name: 'Birmingham Centenary Plaza',
    description: 'Located in the vibrant Westside district, these apartments offer the perfect blend of city life and luxury comfort.',
    address: { line1: '100 Centenary Way', city: 'Birmingham', postcode: 'B1 1QU' },
    location: { type: 'Point', coordinates: [-1.9025, 52.4862] },
    amenities: ['Business Centre', 'Sky Bar', 'Concierge', 'Dry Cleaning Service'],
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
    featuredImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    developer: 'Midland Reach',
    minPrice: 950,
    maxPrice: 2500,
    virtualTourUrl: 'https://my.matterport.com/show/?m=example3',
  },
  {
    name: 'Leeds Dockside Living',
    description: 'Premium waterfront apartments at the heart of Leeds Dock, featuring modern interiors and access to a thriving community.',
    address: { line1: 'The Quays', city: 'Leeds', postcode: 'LS10 1PZ' },
    location: { type: 'Point', coordinates: [-1.5491, 53.8008] },
    amenities: ['Waterside Views', 'Coffee Shop', 'Gym', 'Parking Available'],
    images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'],
    featuredImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e',
    developer: 'Northern Powerhouse',
    minPrice: 850,
    maxPrice: 2200,
  },
  {
    name: 'Liverpool Baltic Rise',
    description: 'Modern living in the heart of the Baltic Triangle, Liverpool\'s creative hub. Perfect for young professionals.',
    address: { line1: 'Baltic Way', city: 'Liverpool', postcode: 'L1 0AF' },
    location: { type: 'Point', coordinates: [-2.9916, 53.4084] },
    amenities: ['Creative Spaces', 'Roof Terrace', 'Bike Storage', 'High Speed Wifi'],
    images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858', 'https://images.unsplash.com/photo-1515263487990-61b07816b324'],
    featuredImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    developer: 'Mersey Dev',
    minPrice: 750,
    maxPrice: 1800,
  },
  {
    name: 'The Shard Residences',
    description: 'Iconic living in the tallest building in Western Europe. Unmatched luxury with 360-degree views of London.',
    address: { line1: '32 London Bridge St', city: 'London', postcode: 'SE1 9SG' },
    location: { type: 'Point', coordinates: [-0.0865, 51.5045] },
    amenities: ['VIP Concierge', 'Infinity Pool', 'Private Chef', 'Valet Parking'],
    images: ['https://images.unsplash.com/photo-1507089947368-19c1da9775ae', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb'],
    featuredImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
    developer: 'Global Luxury',
    minPrice: 8000,
    maxPrice: 25000,
  },
  {
    name: 'Manchester Deansgate Square',
    description: 'Setting a new standard for city centre living with the finest private residential facilities in the UK.',
    address: { line1: 'Owen St', city: 'Manchester', postcode: 'M15 4YB' },
    location: { type: 'Point', coordinates: [-2.2495, 53.4735] },
    amenities: ['25m Pool', 'Sports Hall', 'Tea Room', 'Library'],
    images: ['https://images.unsplash.com/photo-1556912177-c54030639a60', 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85'],
    featuredImage: 'https://images.unsplash.com/photo-1556912177-c54030639a60',
    developer: 'Renaker',
    minPrice: 1500,
    maxPrice: 4500,
  },
  {
    name: 'Birmingham Snow Hill Wharf',
    description: 'A collection of high-specification apartments in a prime canal-side location.',
    address: { line1: 'Shadwell St', city: 'Birmingham', postcode: 'B4 6HA' },
    location: { type: 'Point', coordinates: [-1.8985, 52.4885] },
    amenities: ['Sauna', 'Steam Room', 'Private Cinema', 'Garden'],
    images: ['https://images.unsplash.com/photo-1536376074432-a228d0677e4f', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36'],
    featuredImage: 'https://images.unsplash.com/photo-1536376074432-a228d0677e4f',
    developer: 'St Joseph',
    minPrice: 1100,
    maxPrice: 2800,
  },
  {
    name: 'Leeds Wellington Place',
    description: 'A leading urban quarter that brings people together to work, live and play.',
    address: { line1: '5 Wellington Place', city: 'Leeds', postcode: 'LS1 4AP' },
    location: { type: 'Point', coordinates: [-1.5545, 53.7955] },
    amenities: ['Electric Charging', 'Parcel Room', 'Meeting Rooms', 'Pet Friendly'],
    images: ['https://images.unsplash.com/photo-1512918766671-ad651b9d732d', 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0'],
    featuredImage: 'https://images.unsplash.com/photo-1512918766671-ad651b9d732d',
    developer: 'MEPC',
    minPrice: 1000,
    maxPrice: 2600,
  },
  {
    name: 'Liverpool Plaza Royale',
    description: 'Experience regal living in Liverpool\'s historic business district.',
    address: { line1: 'Old Hall St', city: 'Liverpool', postcode: 'L3 9PP' },
    location: { type: 'Point', coordinates: [-2.9945, 53.4095] },
    amenities: ['Sky Garden', 'Games Room', 'Bike Storage', 'High Speed Lift'],
    images: ['https://images.unsplash.com/photo-1493201481628-36da42da2a80', 'https://images.unsplash.com/photo-1527359443443-84a48abc7df0'],
    featuredImage: 'https://images.unsplash.com/photo-1493201481628-36da42da2a80',
    developer: 'Regent Homes',
    minPrice: 900,
    maxPrice: 2400,
  }
];

const unitTypes = ['studio', '1-bed', '2-bed', '3-bed', 'penthouse'];
const statuses = ['available', 'hold', 'reserved', 'let_agreed', 'coming_soon'];

const seedData = async () => {
  try {
    // 1. Connect to Database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    // 2. Clear existing data
    await Development.deleteMany();
    await Unit.deleteMany();
    console.log('Existing data cleared.');

    // 3. Insert Developments
    const createdDevelopments = await Development.insertMany(developments);
    console.log(`${createdDevelopments.length} developments inserted.`);

    // 4. Generate and Insert Units
    const units = [];
    createdDevelopments.forEach((dev) => {
      // Create 10 units for each development
      for (let i = 1; i <= 10; i++) {
        const type = unitTypes[Math.floor(Math.random() * unitTypes.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Base price calculation based on dev min/max
        const price = Math.floor(dev.minPrice + (Math.random() * (dev.maxPrice - dev.minPrice)));
        
        units.push({
          development: dev._id,
          unitNumber: `${Math.floor(Math.random() * 9) + 1}0${i}`,
          type: type,
          floor: Math.floor(Math.random() * 20) + 1,
          size: Math.floor(Math.random() * 500) + 400, // sqft
          price: price,
          status: status,
          availableFrom: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000), // Within next 90 days
          features: {
            petsAllowed: Math.random() > 0.3,
            parking: Math.random() > 0.5,
            balcony: Math.random() > 0.4,
            furnished: Math.random() > 0.2,
          },
          images: dev.images
        });
      }
    });

    await Unit.insertMany(units);
    console.log(`${units.length} units inserted.`);

    console.log('Database Seeding Completed Successfully! 🌱');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
