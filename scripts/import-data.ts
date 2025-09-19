import { importCSVData } from '../src/lib/etl';
import { readFileSync } from 'fs';
import { join } from 'path';

async function main() {
  try {
    console.log('Starting CSV import...');
    
    // Read the CSV file
    const csvPath = join(process.cwd(), 'Consolidated_sindhisanchaya_books.csv');
    const csvContent = readFileSync(csvPath, 'utf-8');
    
    // Import the data
    const result = await importCSVData(csvContent, 'Consolidated_sindhisanchaya_books.csv');
    
    console.log('Import completed:', result);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

main();
