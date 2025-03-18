
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Key } from 'lucide-react';

interface ApiKeyPromptProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('tddgdGuv5O8ZOeTu'); // Pre-filled with your API key
  
  // Auto submit the API key when component loads
  useEffect(() => {
    if (apiKey) {
      onSubmit(apiKey);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <Key className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">API Key Required</CardTitle>
          <CardDescription className="text-center">
            Please enter your Vehicle Search API key to continue
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-1">
              <Input
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="focus-ring"
              />
              <p className="text-xs text-muted-foreground">
                You can find your API key in your Vehicle Search account settings.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!apiKey.trim()}>
              Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default ApiKeyPrompt;
