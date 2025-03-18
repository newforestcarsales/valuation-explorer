import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatRegistration, isValidUKRegistration } from '@/lib/utils';
import { useSettingsStore } from '@/store/settingsStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, Search, XCircle } from 'lucide-react';
import SettingsDialog from '@/components/SettingsDialog';

interface SearchFormProps {
  onSearch: (registration: string, mileage?: number) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [registration, setRegistration] = useState('');
  const [mileage, setMileage] = useState<string>('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { recentSearches } = useSettingsStore();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registration.trim()) return;
    
    const formattedReg = formatRegistration(registration);
    onSearch(formattedReg, mileage ? parseInt(mileage) : undefined);
  };
  
  const handleRecentSearch = (reg: string) => {
    setRegistration(reg);
    onSearch(reg, mileage ? parseInt(mileage) : undefined);
  };
  
  const isValid = registration.trim() !== '' && isValidUKRegistration(registration);
  const isMileageValid = !mileage || (/^\d+$/.test(mileage) && parseInt(mileage) >= 0);

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Vehicle Valuation</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSettingsOpen(true)}
            className="h-8 w-8"
          >
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="registration" className="text-sm font-medium">
              Registration Number
            </label>
            <div className="relative">
              <Input
                id="registration"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                placeholder="Enter registration"
                className={`focus-ring pr-10 ${!isValid && registration ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
                disabled={loading}
              />
              {registration && (
                <button
                  type="button"
                  onClick={() => setRegistration('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              )}
            </div>
            {!isValid && registration && (
              <p className="text-xs text-red-500 mt-1">
                Please enter a valid UK registration number
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="mileage" className="text-sm font-medium">
              Mileage <span className="text-muted-foreground">(Optional)</span>
            </label>
            <Input
              id="mileage"
              type="number"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              placeholder="Enter vehicle mileage"
              className={`focus-ring ${!isMileageValid ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
              disabled={loading}
            />
            {!isMileageValid && (
              <p className="text-xs text-red-500 mt-1">
                Please enter a valid mileage
              </p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !isValid || !isMileageValid}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <span className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Get Valuation
              </span>
            )}
          </Button>
        </form>
        
        <AnimatePresence>
          {recentSearches.length > 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="pt-1"
            >
              <p className="text-xs text-muted-foreground mb-2">Recent searches:</p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((reg, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleRecentSearch(reg)}
                  >
                    {reg}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <SettingsDialog 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </>
  );
};

export default SearchForm;
