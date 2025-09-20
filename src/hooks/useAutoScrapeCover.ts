import { useEffect, useState } from 'react';
import { Book } from '@/types';

export function useAutoScrapeCover(book: Book) {
  const [coverImage, setCoverImage] = useState(book.imageUrl);
  const [isScraping, setIsScraping] = useState(false);

  useEffect(() => {
    // Only scrape if book doesn't have an image and has an online URL
    if (!book.imageUrl && book.onlineUrl && book.onlineUrl.includes('archive.org')) {
      setIsScraping(true);
      
      const scrapeCover = async () => {
        try {
          const response = await fetch(`/api/books/${book.id}/scrape-cover`, {
            method: 'POST',
          });

          if (response.ok) {
            const data = await response.json();
            setCoverImage(data.imageUrl);
          }
        } catch (error) {
          console.error('Error auto-scraping cover:', error);
        } finally {
          setIsScraping(false);
        }
      };

      // Delay scraping to avoid overwhelming the API
      const timeoutId = setTimeout(scrapeCover, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [book.id, book.imageUrl, book.onlineUrl]);

  return { coverImage, isScraping };
}
