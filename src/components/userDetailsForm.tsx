// components/userDetailsForm.tsx
"use client"
import { signOut, useSession } from 'next-auth/react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { toast, useToast } from './ui/use-toast';
import { Toaster } from './ui/toaster';
import { useRouter } from 'next/router';

const UserDetailsForm: React.FC = () => {
  const {toast} = useToast()


  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    email: session?.user?.email || '',
    phone: session?.user?.phone || '',
    userName: session?.user?.userName || '',
    password: '',
    currentPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description:" please match passwords",
        duration: 5000,
        variant:"destructive"
      })
      return;
    }
    const response = await fetch('/api/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast({
        title: 'User details updated',
        description: 'Your details have been updated',
        duration: 5000,
      })
      await signOut({ redirect: true , callbackUrl:"/sign-in"});
    } else if(response.status == 403) {
      toast({
        title: 'Invalid Password',
        description:" please enter correct password",
        duration: 5000,
        variant:"destructive"
    })}
    else {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        duration: 5000,
        variant:"destructive"
        })
    }
  };

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={session.user.email}
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border text-black"
        />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder={session.user.phone}

          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border text-black"
        />
      </div>
      <div>
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          placeholder={session.user.userName}

          onChange={handleChange}
          className="w-full p-2 border text-black"
        />
      </div>
      <div>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          className="w-full p-2 border text-black"
        />
      </div>
      <div>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border text-black"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border text-black"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white">
        Update Details
      </button>
      <Toaster/>
    </form>
  );
};

export default UserDetailsForm;
