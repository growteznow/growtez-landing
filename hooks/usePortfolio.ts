import { useEffect, useState } from "react";
import { fetchPortfolio, PortfolioItem } from "@/lib/portfolioService";

interface UsePortfolioResult {
  items: PortfolioItem[];
  loading: boolean;
  error: string | null;
}

/**
 * Fetches portfolio items from Firestore once on mount.
 * Returns loading/error states so the UI can handle gracefully.
 */
export function usePortfolio(): UsePortfolioResult {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchPortfolio()
      .then((data) => {
        if (!cancelled) {
          setItems(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to load portfolio:", err);
          setError("Could not load projects.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading, error };
}
