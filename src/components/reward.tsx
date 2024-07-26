'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Gem } from 'lucide-react';

type RewardCardProps = {
  rewardId: number;
  title: string;
  description: string;
  amount: number;
};

const RewardCard: React.FC<RewardCardProps> = ({ rewardId, title, description, amount }) => {
  const [screenshotUrl, setScreenshotUrl] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScreenshotUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!screenshotUrl) {
      setMessage('Please enter a screenshot URL.');
      return;
    }

    const response = await fetch(`/api/rewards/${rewardId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        screenshot: screenshotUrl,
      }),
    });

    const data = await response.json();
    setMessage(data.message);

    // Trigger fade-out effect
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500); // Duration of the fade-out transition
  };

  if (!isVisible) return null;

  return (
    <Card className={`w-full max-w-lg mx-auto my-4 card transition-opacity duration-500', ${ isFadingOut ?  'opacity-0' :"" }`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className='px-6'>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className=' flex flex-row items-center gap-2 text-lg justify-center'>{amount} <Gem size={18}/></p>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="screenshot" className="block text-sm font-medium text-gray-700">
              Screenshot URL
            </label>
            <Input
              type="url"
              value={screenshotUrl}
              onChange={handleUrlChange}
              className='text-left'
              placeholder="https://example.com/screenshot.jpg"
              required
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </CardContent>
    </Card>
  );
};

export default RewardCard;
