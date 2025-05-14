import { createContext, ReactNode } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay } from '@mantine/core';

interface LoadingContextType {
  show: () => void;
  hide: () => void;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, { open, close }] = useDisclosure(false);

  return (
    <LoadingContext.Provider value={{ show: open, hide: close }}>
      <div className="container-loading-overlay">
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        {children}
      </div>
    </LoadingContext.Provider>
  );
};
