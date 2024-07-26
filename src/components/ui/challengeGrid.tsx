'use client';

import { Challenge } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { ChallengeCard } from './challenge';
import { Skeleton } from './skeleton';

type ChallengeGridProps = {
  filterType: 'all' | 'my' | 'accepted';
};

const ChallengeGrid: React.FC<ChallengeGridProps> = ({ filterType }) => {
  const { data: session, status } = useSession();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('/api/challenges', {
          credentials: 'include', // Ensure cookies are included
        });
        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
        }
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (status === 'loading' || loading) {
    return (
      <div className='grid grid-flow-row grid-cols-1 justify-center ml-0 px-0 mb-2 items-center md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-5 lg:mr-5'>
        {/* Render loading skeletons */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-max card h-60 bg-secondary-foreground mt-3 mb-1 bg-opacity-5 shadow-inner border-solid  sliding-div transition-opacity duration-500">
            <div className="flex flex-row gap-1 align-middle text-left justify-center p-3">
              <Skeleton className="h-[40px] w-[90px] rounded-md" />
              <Skeleton className="h-[24px] w-[70px] mt-2 ml-4" />
            </div>
            <div className="flex flex-col gap-5 p-3">
              <Skeleton className="h-[30px]  w-[60px] rounded-md" />
              <div className="flex flex-row text-left justify-between gap-1">
                <div className="flex flex-row gap-3">
                  <Skeleton className="h-[24px] w-[24px] rounded-full" />
                  <Skeleton className="h-[20px] mt-0.5 w-[130px]" />
                </div>
              </div>
            </div>
            <div className="flex flex-row align-middle justify-between gap-5 p-3">
              <Skeleton className="h-[40px] w-[80px] rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const filteredChallenges = challenges.filter((challenge: Challenge) => {
    if (filterType === 'all') {
      return !challenge.accepterId; // Exclude challenges that have an accepterId
    } else if (filterType === 'my') {
      return session ? challenge.challengerId === Number(session.user.id) : false;
    } else if (filterType === 'accepted') {
      return session ? challenge.accepterId === Number(session.user.id) : false;
    }
    return true;
  });

  return (
    <div className='grid grid-flow-row grid-cols-1 justify-center ml-0 px-0 mb-2 items-center md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-3 lg:gap-10'>
      {filteredChallenges.map((challenge: Challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          type={Number(session?.user.id) === challenge.challengerId ? 'my' : ''}
          status={!!challenge.accepterId}
        />
      ))}
    </div>
  );
};

export default ChallengeGrid;
