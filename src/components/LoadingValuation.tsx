
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const LoadingValuation: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse-soft">
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="w-full">
              <Skeleton className="h-5 w-16 mb-2 rounded-full" />
              <Skeleton className="h-7 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mt-1" />
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <Skeleton className="h-4 w-1/3 mb-3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="overflow-hidden border shadow-sm">
                <div className="h-2 w-full bg-muted" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-1/3 mb-1" />
                  <Skeleton className="h-8 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingValuation;
