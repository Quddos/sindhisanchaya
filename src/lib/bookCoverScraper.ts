export interface CoverScrapeResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

/**
 * Scrape book cover from Archive.org
 */
export async function scrapeArchiveOrgCover(archiveUrl: string): Promise<CoverScrapeResult> {
  try {
    // Extract identifier from Archive.org URL
    const match = archiveUrl.match(/archive\.org\/details\/([^\/\?]+)/);
    if (!match) {
      return { success: false, error: 'Invalid Archive.org URL' };
    }

    const identifier = match[1];
    
    // Archive.org API endpoint for book metadata
    const apiUrl = `https://archive.org/metadata/${identifier}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'SindhiSanchaya/1.0 (Book Cover Scraper)',
      },
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to fetch metadata' };
    }

    const data = await response.json();
    
    // Look for cover image in various possible locations
    let coverUrl = null;
    
    // Check for cover in files
    if (data.files) {
      const coverFile = data.files.find((file: any) => 
        file.name && (
          file.name.toLowerCase().includes('cover') ||
          file.name.toLowerCase().includes('front') ||
          file.name.toLowerCase().match(/^page.*\.(jpg|jpeg|png|gif)$/i) ||
          file.name.toLowerCase().match(/^.*\.(jpg|jpeg|png|gif)$/i)
        ) && file.format && (
          file.format.toLowerCase() === 'jpeg' ||
          file.format.toLowerCase() === 'jpg' ||
          file.format.toLowerCase() === 'png' ||
          file.format.toLowerCase() === 'gif'
        )
      );
      
      if (coverFile) {
        coverUrl = `https://archive.org/download/${identifier}/${coverFile.name}`;
      }
    }
    
    // Fallback: try to get the first page as cover
    if (!coverUrl && data.files) {
      const firstPage = data.files.find((file: any) => 
        file.name && file.name.match(/^page.*\.(jpg|jpeg|png|gif)$/i) && 
        file.format && ['jpeg', 'jpg', 'png', 'gif'].includes(file.format.toLowerCase())
      );
      
      if (firstPage) {
        coverUrl = `https://archive.org/download/${identifier}/${firstPage.name}`;
      }
    }
    
    // Another fallback: try to construct a cover URL
    if (!coverUrl) {
      coverUrl = `https://archive.org/services/img/${identifier}`;
    }

    return { success: true, imageUrl: coverUrl };
  } catch (error) {
    console.error('Error scraping Archive.org cover:', error);
    return { success: false, error: 'Network error' };
  }
}

/**
 * Scrape book cover from Google Books API
 */
export async function scrapeGoogleBooksCover(isbn: string): Promise<CoverScrapeResult> {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    
    if (!response.ok) {
      return { success: false, error: 'Failed to fetch from Google Books' };
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const book = data.items[0];
      const coverUrl = book.volumeInfo?.imageLinks?.thumbnail || 
                      book.volumeInfo?.imageLinks?.smallThumbnail ||
                      book.volumeInfo?.imageLinks?.medium ||
                      book.volumeInfo?.imageLinks?.large;
      
      if (coverUrl) {
        return { success: true, imageUrl: coverUrl };
      }
    }
    
    return { success: false, error: 'No cover found' };
  } catch (error) {
    console.error('Error scraping Google Books cover:', error);
    return { success: false, error: 'Network error' };
  }
}

/**
 * Generic book cover scraper that tries multiple sources
 */
export async function scrapeBookCover(bookTitle: string, authorName: string, onlineUrl?: string): Promise<CoverScrapeResult> {
  // Try Archive.org first if URL is provided
  if (onlineUrl && onlineUrl.includes('archive.org')) {
    const result = await scrapeArchiveOrgCover(onlineUrl);
    if (result.success) {
      return result;
    }
  }
  
  // Try to extract ISBN from title or other details and use Google Books
  const isbnMatch = bookTitle.match(/\b\d{10,13}\b/);
  if (isbnMatch) {
    const result = await scrapeGoogleBooksCover(isbnMatch[0]);
    if (result.success) {
      return result;
    }
  }
  
  return { success: false, error: 'No suitable cover source found' };
}

/**
 * Validate if an image URL is accessible
 */
export async function validateImageUrl(imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.startsWith('image/');
  } catch {
    return false;
  }
}
