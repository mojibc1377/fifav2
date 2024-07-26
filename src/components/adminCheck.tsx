import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Challenge } from '@prisma/client';
import NotFound from '@/app/not-found';

interface Submission {
  id: number;
  userId: number;
  rewardId: number;
  screenshot: string;
  approved: boolean;
}

interface ChallengeStats {
  totalChallenges: number;
  noAccepterChallenges: number;
  acceptedChallenges: number;
  completedChallenges: number;
}

const AdminPanel = () => {
  const { data: session, status } = useSession();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<ChallengeStats | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);


  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session || !session.user.isAdmin) {
        
    }
  }, [session, status]);

  useEffect(() => {
    if (session && session.user.isAdmin) {
      // Fetch submissions from the API
      const fetchSubmissions = async () => {
        const response = await fetch('/api/submissions');
        const data = await response.json();
        setSubmissions(data.submissions);
      };

      // Fetch challenge stats from the API
      const fetchStats = async () => {
        const response = await fetch('/api/challenges/stats');
        const data: ChallengeStats = await response.json();
        setStats(data);
      };
      const fetchChallenges = async () => {
        const response = await fetch('/api/challenges/stats/completed');
        const data = await response.json();
        setChallenges(data.challenges);
      };
      fetchChallenges();
      fetchSubmissions();
      fetchStats();
    }
  }, [session]);
  

  const handleApprove = async (submissionId: number) => {
    // Approve the submission
    await fetch(`/api/submissions/${submissionId}/approve`, {
      method: 'POST',
    });

    // Refresh the submissions list
    setSubmissions(submissions.filter(submission => submission.id !== submissionId));
  };

  if (status === 'loading' || !session || !session.user.isAdmin) {
    return <NotFound/>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      
      <div className="overflow-x-auto mb-5">
      <h1 className='text-xl'>challenges</h1>
        <table className="min-w-full card">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Challenger</th>
              <th className="px-4 py-2">accepter</th>
              <th className="px-4 py-2">winner1</th>
              <th className="px-4 py-2">winner2</th>
              <th className="px-4 py-2">sc1</th>
              <th className="px-4 py-2">sc2</th>
              <th className="px-4 py-2">Actions</th>

            </tr>
          </thead>
          <tbody>
            {challenges.map(challenge => (
                <tr key={challenge.id}>
                <td className="border px-4 py-2">{challenge.id}</td>
                <td className="border px-4 py-2">{challenge.challengerId}</td>
                <td className="border px-4 py-2">{challenge.accepterId}</td>
                <td className={`border px-4 py-2 ${challenge.winner[0]? " " : " text-red-500  "}`}>{challenge.winner[0]? challenge.winner[0] : "not yet"}</td>
                <td className={`border px-4 py-2 ${challenge.winner[1]? " " : " text-red-500  "}`}>{challenge.winner[1]? challenge.winner[1] : "not yet"}</td>

                <td className={`border px-4 py-2 ${challenge.resultPhoto[0]? " text-blue-300 italic underline" : "text-red-500 "}`}><a href={challenge.resultPhoto[0]} target="_blank" rel="noopener noreferrer">{challenge.resultPhoto[0]? "view screenshot 1" : "not uploaded yet"}</a></td>
                <td className={`border px-4 py-2 ${challenge.resultPhoto[1]? " text-blue-300 italic underline" : "text-red-500 "}`}><a href={challenge.resultPhoto[1]} target="_blank" rel="noopener noreferrer">{challenge.resultPhoto[1]? "view screenshot 2" : "not uploaded yet"}</a></td>

                <td className="border px-4 py-2">
                {(challenge.winner).length == 2 ? 

<button 
onClick={() => handleApprove(challenge.id)}
className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded `}

>Approve</button>
                 : 
                 <button 
onClick={() => handleApprove(challenge.id)}
className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded `}
disabled
>Approve</button>
                 }
              
                    
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      {stats && (
        <div className="mb-10 flex flex-row items-center gap-4">
          <p>Total Challenges: {stats.totalChallenges}</p>
          <p>Pending challenges: {stats.noAccepterChallenges}</p>
          <p>Accepted challenges: {stats.acceptedChallenges}</p>
          <p>Completed Challenges: {stats.completedChallenges}</p>
        </div>
      )}

      <div className="overflow-x-auto mb-5">
        <h1 className='text-xl'>submissions</h1>
        <table className="min-w-full card">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Reward ID</th>
              <th className="px-4 py-2">Screenshot</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(submission => (
              <tr key={submission.id}>
                <td className="border px-4 py-2">{submission.id}</td>
                <td className="border px-4 py-2">{submission.userId}</td>
                <td className="border px-4 py-2">{submission.rewardId}</td>
                <td className="border px-4 py-2 italic underline text-blue-300"><a href={submission.screenshot} target="_blank" rel="noopener noreferrer">View Screenshot</a></td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => handleApprove(submission.id)}
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded`}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
