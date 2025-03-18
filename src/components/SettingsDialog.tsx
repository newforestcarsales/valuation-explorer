
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useSettingsStore } from '@/store/settingsStore';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ open, onOpenChange }) => {
  const { apiKey, setApiKey, recentSearches, clearRecentSearches } = useSettingsStore();
  const [inputApiKey, setInputApiKey] = useState(apiKey);

  const handleSave = () => {
    setApiKey(inputApiKey);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              API Key
            </label>
            <Input
              id="apiKey"
              type="text"
              value={inputApiKey}
              onChange={(e) => setInputApiKey(e.target.value)}
              placeholder="Enter your Vehicle Search API key"
              className="focus-ring"
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from the Vehicle Search website
            </p>
          </div>

          <AnimatePresence>
            {recentSearches.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Recent Searches</label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearRecentSearches}
                    className="h-7 text-xs"
                  >
                    Clear
                  </Button>
                </div>
                <div className="bg-muted/50 rounded-md p-2 text-sm">
                  <ul className="space-y-1">
                    {recentSearches.map((reg, index) => (
                      <li key={index} className="text-muted-foreground">
                        {reg}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
