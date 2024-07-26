"use client"
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

type Transaction = {
    id: number;
    amount: number;
    timestamp: string;
    userId: number;
  };

  
export default async function TransHistory() {
    const session = await getServerSession(authOptions)

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const fetchTransactions = async () => {
        if (!session || !session.user) {
          setTransactions([]);
          return;
        }
    
        try {
          const response = await fetch(`/api/user/${session.user.id}/transactions`, {
            method: 'GET',
          });
          if (response.ok) {
            const data = await response.json();
            setTransactions(data);
          } else {
            console.error('Failed to fetch transactions:', await response.text());
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);``
        }
      };
    
      useEffect(() => {
        if (session && session.user) {
          fetchTransactions();
        }
      }, [session]);
  return (
    <div className='min-h-screen'>
        <div>
        <h2>Transaction History</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.amount} credits added on {new Date(transaction.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
