// Simple database connection check script
const { PrismaClient } = require('@prisma/client');

async function checkDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Checking database connection...');
    
    // Test basic connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection successful');
    
    // Test book count
    const bookCount = await prisma.book.count();
    console.log(`📚 Total books in database: ${bookCount}`);
    
    // Test online books count
    const onlineCount = await prisma.book.count({ where: { availableOnline: true } });
    console.log(`🌐 Online books: ${onlineCount}`);
    
    // Test collections count
    const collectionCount = await prisma.collection.count();
    console.log(`📁 Collections: ${collectionCount}`);
    
    console.log('✅ All database checks passed');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
