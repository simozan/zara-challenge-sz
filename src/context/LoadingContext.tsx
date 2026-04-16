'use client';

import { createContext, useContext, useState } from 'react';

interface LoadingContextValue {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextValue>({
  loading: false,
  setLoading: () => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
