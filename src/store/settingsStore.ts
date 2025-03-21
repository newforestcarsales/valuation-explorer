
import { useState, useEffect } from 'react';

// Add Chrome extension types
declare global {
  interface Window {
    chrome?: {
      storage?: {
        local: {
          get: (keys: string[], callback: (result: any) => void) => void;
          set: (items: object) => Promise<void>;
        };
      };
    };
  }
}

interface SettingsStore {
  apiKey: string;
  hasSetApiKey: boolean;
  recentSearches: string[];
  setApiKey: (key: string) => Promise<void>;
  addRecentSearch: (registration: string) => Promise<void>;
  clearRecentSearches: () => Promise<void>;
}

export const useSettingsStore = (): SettingsStore => {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [hasSetApiKey, setHasSetApiKey] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Check if running in Chrome extension context
  const isChromeExtension = typeof window !== 'undefined' && 
                            window.chrome !== undefined && 
                            window.chrome.storage !== undefined;

  // Load initial state from Chrome storage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (isChromeExtension) {
          window.chrome?.storage?.local.get(['apiKey', 'recentSearches'], (result) => {
            if (result.apiKey) {
              setApiKeyState(result.apiKey);
              setHasSetApiKey(true);
            }
            if (result.recentSearches) {
              setRecentSearches(result.recentSearches);
            }
          });
        } else {
          // Fallback to localStorage for development
          const storedApiKey = localStorage.getItem('apiKey');
          if (storedApiKey) {
            setApiKeyState(storedApiKey);
            setHasSetApiKey(true);
          }
          
          const storedSearches = localStorage.getItem('recentSearches');
          if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, [isChromeExtension]);

  const setApiKey = async (key: string): Promise<void> => {
    setApiKeyState(key);
    setHasSetApiKey(!!key);
    
    try {
      if (isChromeExtension) {
        await window.chrome?.storage?.local.set({ apiKey: key });
      } else {
        localStorage.setItem('apiKey', key);
      }
    } catch (error) {
      console.error('Error saving API key:', error);
    }
  };

  const addRecentSearch = async (registration: string): Promise<void> => {
    // Add to the beginning and remove duplicates
    const updatedSearches = [
      registration,
      ...recentSearches.filter(reg => reg !== registration)
    ].slice(0, 5); // Keep only the 5 most recent searches
    
    setRecentSearches(updatedSearches);
    
    try {
      if (isChromeExtension) {
        await window.chrome?.storage?.local.set({ recentSearches: updatedSearches });
      } else {
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  };

  const clearRecentSearches = async (): Promise<void> => {
    setRecentSearches([]);
    
    try {
      if (isChromeExtension) {
        await window.chrome?.storage?.local.set({ recentSearches: [] });
      } else {
        localStorage.setItem('recentSearches', JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  };

  return {
    apiKey,
    hasSetApiKey,
    recentSearches,
    setApiKey,
    addRecentSearch,
    clearRecentSearches
  };
};
