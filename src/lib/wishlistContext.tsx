import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface WishlistContextType {
  receivedIds: number[];
  toggleReceived: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextType>({
  receivedIds: [],
  toggleReceived: () => {},
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [receivedIds, setReceivedIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist-received");
    if (saved) setReceivedIds(JSON.parse(saved));
  }, []);

  const toggleReceived = (id: number) => {
    setReceivedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("wishlist-received", JSON.stringify(next));
      return next;
    });
  };

  return (
    <WishlistContext.Provider value={{ receivedIds, toggleReceived }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
