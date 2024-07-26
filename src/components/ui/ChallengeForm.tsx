// src/components/AddChallengeForm.tsx

"use client"
import { useState } from "react";
import { ToastProvider } from '@radix-ui/react-toast';
import { useToast } from "./use-toast";

const AddChallengeForm = () => {
  const { toast } = useToast();
  const [gameType, setGameType] = useState("");
  const [consoleType, setConsoleType] = useState("");
  const [price, setPrice] = useState("");
  const [mode, setMode] = useState(""); // New state for the mode

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/challenges/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameType,
          consoleType,
          price: parseInt(price, 10),
          mode,
        }),
      });
console.log(response)
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Challenge Added",
          description: "You can now wait for your challenge to be accepted",
          duration: 3000,
          variant: "default"
        });
        // Clear form fields if needed
        setGameType("");
        setConsoleType("");
        setPrice("");
        setMode(""); // Clear the mode field
      } else if (response.status === 402) {
        toast({
          title: "Insufficient Funds",
          description: "Please charge account",
          duration: 3000,
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error("Error adding challenge:", error);
      toast({
        title: "Error",
        description: "Oops, something went wrong",
        duration: 3000,
        variant: 'destructive'
      });
    }
  };

  return (
    <ToastProvider>
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto shadow-inner border-solid card sliding-div-x">
        <div className="space-y-4 p-4">
          <div>
            <label className="block mb-2">Game Type</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  value="fc24"
                  checked={gameType === "fc24"}
                  onChange={(e) => setGameType(e.target.value)}
                  className="ml-1 custom-radio"
                  required
                />
                FC24
              </label>
              <label>
                <input
                  type="radio"
                  value="fc25"
                  defaultChecked
                  checked={gameType === "fc25"}
                  onChange={(e) => setGameType(e.target.value)}
                  className="ml-4 custom-radio"
                  required
                />
                FC 25
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2">Console Type</label>
            <select
              value={consoleType}
              onChange={(e) => setConsoleType(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-muted-foreground shadow-sm focus:outline-none focus:border-gray-800"
              required
            >
              <option value="">Select console</option>
              <option value="ps4">PS4</option>
              <option value="ps5">PS5</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-muted-foreground shadow-sm focus:outline-none focus:border-gray-800"
              required
            >
              <option value="">Select mode</option>
              <option value="fut">FUT (Ultimate)</option>
              <option value="kick-off">Kick-Off</option>
              <option value="95-overall">95-Overall</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Price (Coins)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price min:10 max:-"
              className="w-full px-3 py-2 border rounded bg-muted-foreground shadow-sm focus:outline-none focus:border-gray-800 placeholder:text-white"
              required
            />
          </div>

          <button type="submit" className="w-full bg-[#5b6081] hover:bg-[#4c5275] text-white py-2 px-4 mt-4 rounded-md">
            Add Challenge
          </button>
        </div>
      </form>
    </ToastProvider>
  );
};

export default AddChallengeForm;
