import { prisma } from './db';
import { createSearchVector } from './transliteration';
// import { generateBookSummary, generateEmbeddings } from './gemini';
import { ImportStatus } from '@/types';

export interface CSVBookRecord {
  id: string;
  book_name_english: string;
  book_name_devanagari: string;
  book_name_perso_arabic: string;
  author_name_english: string;
  author_name_devanagari: string;
  author_name_perso_arabic: string;
  collection_location: string;
  address: string;
  other_details: string;
  image: string;
  available_online: string;
}

export async function importCSVData(csvContent: string, fileName: string): Promise<ImportStatus> {
  // Create import log entry
  const importLog = await prisma.importLog.create({
    data: {
      fileName,
      recordCount: 0,
      status: 'processing',
    },
  });

  try {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    const records = lines.slice(1).filter(line => line.trim());

    let processedCount = 0;
    const errors: Array<{ error: string; record?: string }> = [];

    // Process records in batches
    const batchSize = 100;
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      
      for (const record of batch) {
        try {
          const fields = parseCSVRecord(record);
          if (fields.length < headers.length) continue;

          const bookData = {
            originalId: parseInt(fields[0]) || 0,
            titleEnglish: fields[1] || null,
            titleDevanagari: fields[2] || null,
            titlePersoArabic: fields[3] || null,
            authorEnglish: fields[4] || null,
            authorDevanagari: fields[5] || null,
            authorPersoArabic: fields[6] || null,
            collectionLocation: fields[7] || null,
            address: fields[8] || null,
            otherDetails: fields[9] || null,
            imageUrl: fields[10] === 'NaN' ? null : fields[10] || null,
            availableOnline: fields[11] === 'TRUE',
            onlineUrl: fields[11] === 'TRUE' && fields[7]?.startsWith('http') ? fields[7] : null,
            searchVector: createSearchVector({
              titleEnglish: fields[1],
              titleDevanagari: fields[2],
              titlePersoArabic: fields[3],
              authorEnglish: fields[4],
              authorDevanagari: fields[5],
              authorPersoArabic: fields[6],
              collectionLocation: fields[7],
              otherDetails: fields[9],
            }),
            // AI features will be generated later in background
            summary: null,
            embeddings: [],
          };

          // Upsert the book record
          await prisma.book.upsert({
            where: { originalId: bookData.originalId },
            update: bookData,
            create: bookData,
          });

          processedCount++;
        } catch (error) {
          errors.push({
            record: record.substring(0, 100),
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      // Update progress
      await prisma.importLog.update({
        where: { id: importLog.id },
        data: {
          recordCount: processedCount,
          errors: errors.length > 0 ? errors : null,
        },
      });
    }

    // Mark as completed
    await prisma.importLog.update({
      where: { id: importLog.id },
      data: {
        status: 'completed',
        recordCount: processedCount,
        completedAt: new Date(),
        errors: errors.length > 0 ? errors : null,
      },
    });

    return {
      id: importLog.id,
      fileName,
      recordCount: processedCount,
      status: 'completed',
      errors: errors.length > 0 ? errors : undefined,
      startedAt: importLog.startedAt,
      completedAt: new Date(),
    };
  } catch (error) {
    // Mark as failed
    await prisma.importLog.update({
      where: { id: importLog.id },
      data: {
        status: 'failed',
        errors: [{ error: error instanceof Error ? error.message : 'Unknown error' }],
        completedAt: new Date(),
      },
    });

    throw error;
  }
}

function parseCSVRecord(record: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < record.length; i++) {
    const char = record[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  fields.push(current.trim());
  return fields;
}

export async function getImportStatus(importId: number): Promise<ImportStatus | null> {
  const importLog = await prisma.importLog.findUnique({
    where: { id: importId },
  });

  if (!importLog) return null;

  return {
    id: importLog.id,
    fileName: importLog.fileName,
    recordCount: importLog.recordCount,
    status: importLog.status as 'pending' | 'processing' | 'completed' | 'failed',
    errors: importLog.errors as Array<{ error: string; record?: string }> | null,
    startedAt: importLog.startedAt,
    completedAt: importLog.completedAt,
  };
}

