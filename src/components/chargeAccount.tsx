"use client"
import { useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";

const AddCreditForm = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

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
          amount: parseInt(amount, 10),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Credit updated successfully.");
      } else {
        setMessage(data.message || "Failed to update credit.");
      }
    } catch (error) {
    (console.error()
      );
    }
  };

  return (
    <SessionProvider>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="text-black"
          />
        </div>
        <button type="submit">Add Credit</button>
        {message && <p>{message}</p>}
      </form>
      
    </SessionProvider>
  );
};

export default AddCreditForm;