// src/components/RewardCardSkeleton.tsx

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const RewardCardSkeleton: React.FC = () => {
  return (
    <div className="card p-4 border rounded-lg flex flex-col shadow-md">
      <Skeleton className="h-6 w-1/2 mb-2 self-center" />
      <Skeleton className="h-4 w-4/5 self-center mb-2" />
      <Skeleton className="h-4 w-2/3 mb-5 self-center" />
      <Skeleton className="h-5 w-1/4 mb-5 self-center" />
      <Skeleton className="h-2 w-2/4 mb-1 self-center" />
      <Skeleton className="h-6 w-full rounded-sm mb-2 self-center" />




      <Skeleton className="h-7 w-4/12 self-center mb-2" />
      
    </div>
  );
};

export default RewardCardSkeleton;
