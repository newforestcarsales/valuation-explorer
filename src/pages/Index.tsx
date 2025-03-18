
import React, { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import ValuationResult from '@/components/ValuationResult';
import LoadingValuation from '@/components/LoadingValuation';
import ApiKeyPrompt from '@/components/ApiKeyPrompt';
import ErrorMessage from '@/components/ErrorMessage';
import { simulateVehicleValuation } from '@/services/vehicleApi';
import { useSettingsStore } from '@/store/settingsStore';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const { apiKey, hasSetApiKey, setApiKey, addRecentSearch } = useSettingsStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [valuationData, setValuationData] = useState<any>(null);
  const [showContainer, setShowContainer] = useState(false);

  useEffect(() => {
    // Add small delay to show container with animation
    const timer = setTimeout(() => {
      setShowContainer(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
  };

  const handleSearch = async (registration: string, mileage?: number) => {
    setLoading(true);
    setError(null);
    setValuationData(null);

    try {
      // Use simulateVehicleValuation for demonstration
      // In a real extension, this would use fetchVehicleValuation with the actual API key
      const result = await simulateVehicleValuation(registration, mileage);

      if (result.success && result.data) {
        setValuationData(result.data);
        addRecentSearch(registration);
      } else {
        setError(result.error || 'Failed to fetch vehicle data.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!showContainer) {
    return null;
  }

  if (!hasSetApiKey) {
    return (
      <div className="min-h-[600px] w-[400px] flex items-center justify-center p-6 bg-background">
        <ApiKeyPrompt onSubmit={handleApiKeySubmit} />
      </div>
    );
  }

  return (
    <div className="min-h-[600px] w-[400px] p-6 bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <SearchForm onSearch={handleSearch} loading={loading} />
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingValuation />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ErrorMessage message={error} onRetry={() => setError(null)} />
            </motion.div>
          ) : valuationData ? (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ValuationResult data={valuationData} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[300px] flex items-center justify-center"
            >
              <div className="text-center text-muted-foreground">
                <p>Enter a registration number to get started</p>
                <p className="text-sm mt-1">For example: AB12CDE</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Index;
