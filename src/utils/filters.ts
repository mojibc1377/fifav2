// src/utils/filters.ts

import { Challenge } from '@prisma/client';
import { Session } from 'next-auth';

export const filterAll = (challenge: Challenge, session: Session | null): boolean => {
  return true; // No filtering, show all challenges
};

export const filterMyChallenges = (challenge: Challenge, session: Session | null): boolean => {
  return session ? challenge.challengerId === Number(session.user.id) : false;
};

export const filterAcceptedChallenges = (challenge: Challenge, session: Session | null): boolean => {
  return session ? challenge.accepterId === Number(session.user.id) : false;
};
