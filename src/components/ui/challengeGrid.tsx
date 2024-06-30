import React from 'react';
import { ChallengeCard } from './challenge';

type ChallengeGridProps = {
  type: string;
  status: boolean;
};

const ChallengeGrid: React.FC<ChallengeGridProps> = ({ type, status }) => {
  return (
    <div className='grid grid-flow-row grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
      <ChallengeCard type={type} status={status} />
      <ChallengeCard type={type} status={status} />
      <ChallengeCard type={type} status={status} />
      <ChallengeCard type={type} status={status} />
      <ChallengeCard type={type} status={status} />
      <ChallengeCard type={type} status={status} />
    </div>
  );
};

export default ChallengeGrid;