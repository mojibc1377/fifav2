// src/components/ChallengeGrid.tsx

"use client"
import { Challenge } from '@prisma/client';
import { Session } from 'next-auth';
import React, { useEffect, useState } from 'react';
import { ChallengeCard } from './challenge';

type ChallengeGridProps = {
  filterType: 'all' | 'my' | 'accepted';
};

const ChallengeGrid: React.FC<ChallengeGridProps> = ({ filterType }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [session, setSession] = useState<Session>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/session', {
          credentials: 'include', // Ensure cookies are included
        });
        if (!response.ok) {
          throw new Error('Failed to fetch session');
        }
        const dataSession = await response.json();
        setSession(dataSession);
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

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
      }
    };

    fetchSession();
    fetchChallenges();
  }, []);

  useEffect(() => {
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
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
    <div className='grid grid-flow-row grid-cols-1 justify-center ml-0 px-0 items-center md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-5 lg:mr-5'>
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
