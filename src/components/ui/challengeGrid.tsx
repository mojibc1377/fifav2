import React from 'react';
import { ChallengeCard } from './challenge';

type ChallengeGridProps = {
  type: string;
  status: boolean;
};

const ChallengeGrid: React.FC<ChallengeGridProps> = ({ type, status }) => {
  return (
    <div className='grid grid-flow-row grid-cols-1 justify-center ml-0 px-0 items-center md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-5 lg:mr-5'>
      <ChallengeCard type={type} status={status} />
      <ChallengeCard type={type} status={status} />

      <ChallengeCard type={type} status={status} />

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