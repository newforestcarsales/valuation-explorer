
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface ValuationCardProps {
  title: string;
  value: number;
  type: 'retail' | 'trade' | 'private';
}

const ValuationCard: React.FC<ValuationCardProps> = ({ title, value, type }) => {
  const bgColors = {
    retail: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    trade: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20',
    private: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
  };
  
  const textColors = {
    retail: 'text-blue-600 dark:text-blue-400',
    trade: 'text-emerald-600 dark:text-emerald-400',
    private: 'text-purple-600 dark:text-purple-400'
  };
  
  const borderColors = {
    retail: 'border-blue-200 dark:border-blue-800/30',
    trade: 'border-emerald-200 dark:border-emerald-800/30',
    private: 'border-purple-200 dark:border-purple-800/30'
  };

  return (
    <Card className={`overflow-hidden border ${borderColors[type]} shadow-sm transition-all duration-300 hover:shadow-md`}>
      <div className={`h-2 ${textColors[type]} w-full`} />
      <CardContent className={`p-4 ${bgColors[type]}`}>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className={`text-2xl font-semibold mt-1 ${textColors[type]}`}>
          {formatCurrency(value)}
        </p>
      </CardContent>
    </Card>
  );
};

export default ValuationCard;
