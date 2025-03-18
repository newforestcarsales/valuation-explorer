
import React from 'react';
import { motion } from 'framer-motion';
import ValuationCard from './ValuationCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ValuationResultProps {
  data: {
    registration: string;
    make: string;
    model: string;
    year: number;
    retailValue: number;
    tradeValue: number;
    privateValue: number;
    mileage?: number;
  };
}

const ValuationResult: React.FC<ValuationResultProps> = ({ data }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <motion.div variants={item}>
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <Badge className="mb-2" variant="outline">
                  {data.year}
                </Badge>
                <CardTitle className="text-xl font-semibold">
                  {data.make} {data.model}
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <span className="font-medium">{data.registration}</span>
                  {data.mileage && (
                    <span className="ml-2 text-muted-foreground">• {data.mileage.toLocaleString()} miles</span>
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <p className="text-sm mb-3 text-muted-foreground">Current market values</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <ValuationCard 
                title="Retail" 
                value={data.retailValue} 
                type="retail" 
              />
              <ValuationCard 
                title="Private" 
                value={data.privateValue} 
                type="private" 
              />
              <ValuationCard 
                title="Trade-in" 
                value={data.tradeValue} 
                type="trade" 
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ValuationResult;
