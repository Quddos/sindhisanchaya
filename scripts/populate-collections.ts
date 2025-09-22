import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function populateCollections() {
  try {
    console.log('Starting to populate collections...');
    
    // Get all unique collection locations from books
    const books = await prisma.book.findMany({
      select: {
        collectionLocation: true,
      },
      where: {
        collectionLocation: {
          not: null,
        },
      },
    });

    // Extract unique collection locations
    const uniqueLocations = [...new Set(books.map(book => book.collectionLocation).filter(Boolean))];
    
    console.log(`Found ${uniqueLocations.length} unique collection locations`);

    // Create collections from unique locations
    for (const location of uniqueLocations) {
      if (!location) continue;
      
      // Extract collection name from URL or use the full URL
      let collectionName = location;
      let collectionAddress = '';
      
      // Try to extract meaningful names from URLs
      if (location.includes('pgsindhi-library.sanchaya.net')) {
        collectionName = 'SindhiSanchaya Digital Library';
        collectionAddress = 'Digital Archive';
      } else if (location.includes('archive.org')) {
        collectionName = 'Internet Archive';
        collectionAddress = 'Online Archive';
      } else if (location.includes('britishmuseum')) {
        collectionName = 'British Museum';
        collectionAddress = 'London, UK';
      } else {
        // Use the domain or a shortened version
        try {
          const url = new URL(location);
          collectionName = url.hostname.replace('www.', '');
        } catch {
          collectionName = location.substring(0, 50) + (location.length > 50 ? '...' : '');
        }
      }

      // Check if collection already exists
      const existingCollection = await prisma.collection.findFirst({
        where: {
          OR: [
            { name: collectionName },
            { location: location },
          ],
        },
      });

      if (!existingCollection) {
        await prisma.collection.create({
          data: {
            name: collectionName,
            location: location,
            address: collectionAddress,
            description: `Collection of Sindhi literature from ${collectionName}`,
          },
        });
        console.log(`Created collection: ${collectionName}`);
      } else {
        console.log(`Collection already exists: ${collectionName}`);
      }
    }

    // Get final count
    const collectionCount = await prisma.collection.count();
    console.log(`Total collections: ${collectionCount}`);
    
  } catch (error) {
    console.error('Error populating collections:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateCollections();
