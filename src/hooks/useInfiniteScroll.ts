
import { useState, useEffect, useCallback } from 'react';
import { Superhero } from '@/types/superhero';

interface UseInfiniteScrollProps {
  data: Superhero[];
  itemsPerPage?: number;
}

export const useInfiniteScroll = ({ data, itemsPerPage = 20 }: UseInfiniteScrollProps) => {
  const [displayedItems, setDisplayedItems] = useState<Superhero[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset when data changes
    const initialItems = data.slice(0, itemsPerPage);
    setDisplayedItems(initialItems);
    setHasMore(data.length > itemsPerPage);
  }, [data, itemsPerPage]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const currentLength = displayedItems.length;
      const nextItems = data.slice(currentLength, currentLength + itemsPerPage);
      
      setDisplayedItems(prev => [...prev, ...nextItems]);
      setHasMore(currentLength + nextItems.length < data.length);
      setLoading(false);
    }, 500);
  }, [data, displayedItems.length, itemsPerPage, loading, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return { displayedItems, hasMore, loading };
};
