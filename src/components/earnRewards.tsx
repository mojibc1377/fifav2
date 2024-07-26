'use client';

import React, { useState, useEffect } from 'react';
import RewardCard from './reward';
import RewardCardSkeleton from './rewardSkeleton';
import { useSession, SessionProvider } from 'next-auth/react';

interface Reward {
  id: number;
  title: string;
  description: string;
  amount: number;
  submittedUserIds: number[];
}

const EarnPage = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await fetch('/api/rewards');
        const data = await response.json();
        setRewards(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rewards:', error);
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
//   Filter rewards based on the user's submissions
  const filteredRewards = rewards?.filter(
    reward => !reward.submittedUserIds?.includes(Number(session?.user?.id))
  );

  return (
    <div className="flex flex-col text-center justify-center mx-auto px-6 ml-3 min-h-screen">
      <SessionProvider>
        <h1 className="text-2xl text-center font-bold my-4">Earn Credits by Completing Rewards</h1>
        <h2 className='text-center'>How It Works:</h2>
        <div className='text-center'>
          Explore: Browse the listed challenges, each with a unique title, description, and credit reward.<br />
          Complete: Follow the instructions to complete the challenge.<br />
          Upload: Submit a clear screenshot as proof.<br />
          Submit: Click "Submit" and earn credits after approval.<br />
          Tips:<br />
          Ensure your screenshot is clear and meets the challenge requirements.<br />
          Be honest and submit genuine proofs.<br />
          Start earning credits now by selecting a challenge below. Good luck!<br />
        </div>
        <div className="grid grid-flow-row grid-cols-1 mt-6 justify-center ml-0 px-0 mb-2 items-center md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-5 lg:mr-5">
          {loading
            ? Array.from({ length: rewards.length }).map((_, index) => (
                <RewardCardSkeleton key={index} />
              ))
            : filteredRewards.map((reward) => (
                <RewardCard
                  key={reward.id}
                  rewardId={reward.id}
                  title={reward.title}
                  description={reward.description}
                  amount={reward.amount}
                />
              ))}
        </div>
      </SessionProvider>
    </div>
  );
};

export default EarnPage;
