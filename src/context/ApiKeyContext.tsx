import React, { createContext, useContext, useEffect, useState } from 'react';

type ApiKeys = {
  openai?: string;
  gemini?: string;
};

type ApiKeyContextType = {
  apiKeys: ApiKeys;
  setApiKey: (service: keyof ApiKeys, key: string) => void;
  clearApiKey: (service: keyof ApiKeys) => void;
};

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
  const [apiKeys, setApiKeys] = useState<ApiKeys>(() => {
    const savedKeys = localStorage.getItem('apiKeys');
    return savedKeys ? JSON.parse(savedKeys) : {};
  });

  useEffect(() => {
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  const setApiKey = (service: keyof ApiKeys, key: string) => {
    setApiKeys(prev => ({ ...prev, [service]: key }));
  };

  const clearApiKey = (service: keyof ApiKeys) => {
    setApiKeys(prev => {
      const newKeys = { ...prev };
      delete newKeys[service];
      return newKeys;
    });
  };

  return (
    <ApiKeyContext.Provider value={{ apiKeys, setApiKey, clearApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKeys() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKeys must be used within a ApiKeyProvider');
  }
  return context;
}
