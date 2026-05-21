import mongoose from 'mongoose';
import dotenv from 'dotenv';
import slugify from 'slugify';
import Development from './models/Development.js';
import Unit from './models/Unit.js';

dotenv.config();

const developments = [
  {
    name: 'The Sky Gardens',
    description: 'Luxury living in the heart of Nine Elms with breathtaking views of the London skyline. Features a 24-hour concierge, private gym, and communal roof gardens.',
    address: { line1: '8 Sky Gardens Way', city: 'London', postcode: 'SW8 2BT' },
    location: { type: 'Point', coordinates: [-0.1245, 51.4852] },
    amenities: ['24/7 Concierge', 'Roof Garden', 'Gym', 'Cinema Room', 'Co-working Space', 'Pet Spa'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1460317442991-0ec239397118?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200',
    developer: 'Vantage Point',
    minPrice: 2800,
    maxPrice: 6500,
    petFriendly: true,
    furnished: true,
    parking: true,
    availableUnits: 12,
    operatorPackage: 'Elite',
    completionDate: new Date('2024-06-01'),
    virtualTourUrl: 'https://my.matterport.com/show/?m=example1',
  },
  {
    name: 'Victoria Riverside',
    description: 'A striking new addition to the Manchester skyline, offering modern apartments with high-end finishes and exclusive resident facilities in the Victoria North regeneration zone.',
    address: { line1: '1 Victoria Riverside', city: 'Manchester', postcode: 'M4 4AU' },
    location: { type: 'Point', coordinates: [-2.2426, 53.4808] },
    amenities: ['Private Gym', 'Resident Lounge', 'Bike Storage', 'Pet Spa', 'Yoga Studio', 'Podium Garden'],
    images: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200',
    developer: 'Urban Living',
    minPrice: 1350,
    maxPrice: 3200,
    petFriendly: true,
    furnished: true,
    parking: false,
    availableUnits: 8,
    operatorPackage: 'Premium',
    completionDate: new Date('2024-09-15'),
    virtualTourUrl: 'https://my.matterport.com/show/?m=example2',
  },
  {
    name: 'Centenary Plaza',
    description: 'Located in the vibrant Westside district of Birmingham, these apartments offer the perfect blend of city life and luxury comfort with a dedicated wellness suite.',
    address: { line1: '100 Centenary Way', city: 'Birmingham', postcode: 'B1 1QU' },
    location: { type: 'Point', coordinates: [-1.9025, 52.4862] },
    amenities: ['Business Centre', 'Sky Bar', 'Concierge', 'Dry Cleaning Service', 'Steam Room'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200',
    developer: 'Midland Reach',
    minPrice: 1100,
    maxPrice: 2500,
    petFriendly: false,
    furnished: true,
    parking: true,
    availableUnits: 15,
    operatorPackage: 'Essential',
    completionDate: new Date('2025-01-20'),
    virtualTourUrl: 'https://my.matterport.com/show/?m=example3',
  },
  {
    name: 'Leeds Dockside',
    description: 'Premium waterfront apartments at the heart of Leeds Dock, featuring modern interiors and access to a thriving community of creatives and professionals.',
    address: { line1: 'The Quays', city: 'Leeds', postcode: 'LS10 1PZ' },
    location: { type: 'Point', coordinates: [-1.5491, 53.8008] },
    amenities: ['Waterside Views', 'Coffee Shop', 'Gym', 'Parking Available', 'Communal BBQ Area'],
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200',
    developer: 'Northern Powerhouse',
    minPrice: 950,
    maxPrice: 2200,
    petFriendly: true,
    furnished: true,
    parking: true,
    availableUnits: 5,
    operatorPackage: 'Premium',
    completionDate: new Date('2024-03-10'),
  },
  {
    name: 'Baltic Rise',
    description: 'Modern living in the heart of the Baltic Triangle, Liverpool\'s creative hub. Featuring a rooftop terrace with panoramic Mersey views.',
    address: { line1: 'Baltic Way', city: 'Liverpool', postcode: 'L1 0AF' },
    location: { type: 'Point', coordinates: [-2.9916, 53.4084] },
    amenities: ['Creative Spaces', 'Roof Terrace', 'Bike Storage', 'High Speed Wifi', 'Resident Cinema'],
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200',
    developer: 'Mersey Dev',
    minPrice: 850,
    maxPrice: 1800,
    petFriendly: true,
    furnished: false,
    parking: false,
    availableUnits: 20,
    operatorPackage: 'Essential',
    completionDate: new Date('2024-12-01'),
  },
  {
    name: 'The Shard Residences',
    description: 'Iconic living in the tallest building in Western Europe. Unmatched luxury with 360-degree views of London and personalized concierge services.',
    address: { line1: '32 London Bridge St', city: 'London', postcode: 'SE1 9SG' },
    location: { type: 'Point', coordinates: [-0.0865, 51.5045] },
    amenities: ['VIP Concierge', 'Infinity Pool', 'Private Chef', 'Valet Parking', 'Wine Cellar'],
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1556912177-c54030639a60?auto=format&fit=crop&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200',
    developer: 'Global Luxury',
    minPrice: 8500,
    maxPrice: 25000,
    petFriendly: true,
    furnished: true,
    parking: true,
    availableUnits: 3,
    operatorPackage: 'Elite',
    completionDate: new Date('2023-08-15'),
  },
  {
    name: 'Deansgate Square',
    description: 'Setting a new standard for city centre living with the finest private residential facilities in the UK, located at the southern gateway to Manchester.',
    address: { line1: 'Owen St', city: 'Manchester', postcode: 'M15 4YB' },
    location: { type: 'Point', coordinates: [-2.2495, 53.4735] },
    amenities: ['25m Pool', 'Sports Hall', 'Tea Room', 'Library', 'Dining Room'],
    images: [
      'https://images.unsplash.com/photo-1556912177-c54030639a60?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1536376074432-a228d0677e4f?auto=format&fit=crop&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1556912177-c54030639a60?auto=format&fit=crop&w=1200',
    developer: 'Renaker',
    minPrice: 1650,
    maxPrice: 4500,
    petFriendly: true,
    furnished: true,
    parking: true,
    availableUnits: 10,
    operatorPackage: 'Elite',
    completionDate: new Date('2024-05-01'),
  },
  {
    name: 'Snow Hill Wharf',
    description: 'A collection of high-specification apartments in a prime canal-side location in Birmingham\'s Gun Quarter.',
    address: { line1: 'Shadwell St', city: 'Birmingham', postcode: 'B4 6HA' },
    location: { type: 'Point', coordinates: [-1.8985, 52.4885] },
    amenities: ['Sauna', 'Steam Room', 'Private Cinema', 'Garden', '24h Security'],
    images: [
      'https://images.unsplash.com/photo-1536376074432-a228d0677e4f?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1512918766671-ad651b9d732d?auto=format&fit=crop&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1536376074432-a228d0677e4f?auto=format&fit=crop&w=1200',
    developer: 'St Joseph',
    minPrice: 1250,
    maxPrice: 2800,
    petFriendly: true,
    furnished: true,
    parking: false,
    availableUnits: 14,
    operatorPackage: 'Premium',
    completionDate: new Date('2024-10-30'),
  },
  {
    name: 'Wellington Place',
    description: 'A leading urban quarter that brings people together to work, live and play in the heart of Leeds.',
    address: { line1: '5 Wellington Place', city: 'Leeds', postcode: 'LS1 4AP' },
    location: { type: 'Point', coordinates: [-1.5545, 53.7955] },
    amenities: ['Electric Charging', 'Parcel Room', 'Meeting Rooms', 'Pet Friendly', 'Yoga Area'],
    images: [
      'https://images.unsplash.com/photo-1512918766671-ad651b9d732d?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1493201481628-36da42da2a80?auto=format&fit=crop&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1512918766671-ad651b9d732d?auto=format&fit=crop&w=1200',
    developer: 'MEPC',
    minPrice: 1050,
    maxPrice: 2600,
    petFriendly: true,
    furnished: true,
    parking: true,
    availableUnits: 7,
    operatorPackage: 'Premium',
    completionDate: new Date('2024-07-01'),
  },
  {
    name: 'Plaza Royale',
    description: 'Experience regal living in Liverpool\'s historic business district with modern touches and a stunning sky garden.',
    address: { line1: 'Old Hall St', city: 'Liverpool', postcode: 'L3 9PP' },
    location: { type: 'Point', coordinates: [-2.9945, 53.4095] },
    amenities: ['Sky Garden', 'Games Room', 'Bike Storage', 'High Speed Lift', 'Guest Suites'],
    images: [
      'https://images.unsplash.com/photo-1493201481628-36da42da2a80?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1527359443443-84a48abc7df0?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1493201481628-36da42da2a80?auto=format&fit=crop&w=1200',
    developer: 'Regent Homes',
    minPrice: 950,
    maxPrice: 2400,
    petFriendly: false,
    furnished: true,
    parking: false,
    availableUnits: 18,
    operatorPackage: 'Essential',
    completionDate: new Date('2025-02-14'),
  }
];

const unitTypes = ['studio', '1-bed', '2-bed', '3-bed', 'penthouse'];
const statuses = ['available', 'hold', 'reserved', 'let_agreed', 'coming_soon'];

const seedData = async () => {
  try {
    // 1. Connect to Database
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully!');

    // 2. Clear existing data
    console.log('Clearing existing data...');
    await Development.deleteMany();
    await Unit.deleteMany();
    console.log('Existing data cleared.');

    // 3. Insert Developments
    console.log('Inserting developments...');
    
    // Generate slugs for each development
    const developmentsWithSlugs = developments.map(dev => ({
      ...dev,
      slug: slugify(dev.name, { lower: true })
    }));

    const createdDevelopments = await Development.insertMany(developmentsWithSlugs);
    console.log(`${createdDevelopments.length} developments inserted.`);

    // 4. Generate and Insert Units
    console.log('Generating units...');
    const units = [];
    createdDevelopments.forEach((dev) => {
      // Create 10 units for each development (total 100)
      for (let i = 1; i <= 10; i++) {
        const type = unitTypes[Math.floor(Math.random() * unitTypes.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Base price calculation based on dev min/max
        const price = Math.floor(dev.minPrice + (Math.random() * (dev.maxPrice - dev.minPrice)));
        
        // Random size based on type
        let size = 400;
        if (type === '1-bed') size = 550 + Math.floor(Math.random() * 100);
        if (type === '2-bed') size = 750 + Math.floor(Math.random() * 150);
        if (type === '3-bed') size = 950 + Math.floor(Math.random() * 200);
        if (type === 'penthouse') size = 1200 + Math.floor(Math.random() * 500);

        units.push({
          development: dev._id,
          unitNumber: `${Math.floor(Math.random() * 20) + 1}0${i}`,
          type: type,
          floor: Math.floor(Math.random() * 20) + 1,
          size: size,
          price: price,
          status: status,
          furnished: Math.random() > 0.2, // 80% furnished
          availableFrom: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000), // Within next 90 days
          features: {
            petsAllowed: dev.petFriendly && Math.random() > 0.2,
            parking: dev.parking && Math.random() > 0.3,
            balcony: Math.random() > 0.4,
          },
          images: [dev.images[Math.floor(Math.random() * dev.images.length)]]
        });
      }
    });

    console.log('Inserting units...');
    await Unit.insertMany(units);
    console.log(`${units.length} units inserted.`);

    console.log('-------------------------------------------');
    console.log('Database Seeding Completed Successfully! 🌱');
    console.log(`- ${createdDevelopments.length} Developments`);
    console.log(`- ${units.length} Units`);
    console.log('-------------------------------------------');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
