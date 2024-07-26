// components/AddPaymentMethod.tsx
"use client"
import { Transaction } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const AddPaymentMethod: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading,setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    amount: ''
  });
  const [message, setMessage] = useState("");

  const { data: session } = useSession();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    setIsLoading(true)
    if (!session || !session.user) {
      setMessage("You must be logged in to charge credit.");
      return;
    }

    try {
      const response = await fetch('/api/user/chargecredit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(formData.amount, 10),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Credit updated successfully.");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to update credit.");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("Failed to update credit due to an unexpected error.");
    }
    useEffect(() => {
      // Simulate loading data
      const timer = setTimeout(() => {
        setIsLoading(false);
      },1000); // Change this to your actual data fetching logic
  
      return () => clearTimeout(timer);
    }, []);
  };
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <div className="min-h-screen w-full flex items-center my-6 lg:px-16 justify-center">
      <div className="cardbanki p-12 rounded-lg shadow-lg lg:max-w-full max-w-md w-full">
        <h2 className="text-white text-2xl mb-4">Add Payment Methods</h2>
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="text-white flex justify-between items-center">
            <div className='flex flex-row gap-4 items-center'>
              <div>
                <div className="font-semibold text-lg">
                  {formData.cardHolderName || "FirstName LastName"}
                </div>
                <div className="text-xs">
                  {formData.cardNumber ? `**** **** **** ${formData.cardNumber.slice(-4)}` : "**** **** **** 0000"}
                </div>
                <div className="text-xs">
                  {formData.expiryMonth && formData.expiryYear ? `${formData.expiryMonth}/${formData.expiryYear}` : "00/00"}
                </div>
              </div>
            </div>
            <div>
              <img src="/images/card.png" alt="Mastercard" className="w-32 h-24 rounded-md"/>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-500">Card Holder Name</label>
            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="John Henry"
            />
          </div>
          <div>
            <label className="block text-gray-500">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="**** **** **** 0000"
            />
          </div>
          <div className="flex space-x-4">
            <div>
              <label className="block text-gray-500">Expiry Month</label>
              <select
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-500">Expiry Year</label>
              <select
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-500">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="XXX"
            />
          </div>
          <div>
            <label className="block text-gray-500">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="50000 IRT"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox"               
            onChange={handleCheckboxChange} 
            className="h-4 w-4 text-blue-600" />
            <label className="text-gray-500 text-sm">By continuing you agree to our <a href="/rules" className="text-blue-500">Terms</a></label>
          </div>
          { isLoading? "Loading" :<button type="submit" className={`w-full p-2 rounded-lg ${termsAccepted ? 'bg-[#5b6081] hover:bg-[#4c5275] text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`} 
            disabled={!termsAccepted}>Add Credit</button> }
   
        </form>
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
      
    </div>
  );
};

export default AddPaymentMethod;
