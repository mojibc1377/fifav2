"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastProvider } from '@radix-ui/react-toast';

type UserDetailsFormInputs = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const UserDetailsForm: React.FC = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<UserDetailsFormInputs>();

  const onSubmit: SubmitHandler<UserDetailsFormInputs> = (data) => {
    console.log('Form submitted:', data);
    toast({
      title: "User Details Updated",
      description: "Your user details have been successfully updated.",
      duration: 3000,
    });
  };

  const password = watch("password");

  return (
    <ToastProvider >
      <Card className="w-full mb-10 max-w-md mx-auto shadow-inner border-solid shadow-[#161e2b] border-[#161e2b] sliding-div-x">
        <CardHeader>
          <CardTitle className='background-muted'>User Details</CardTitle>
          <CardDescription>Update your user details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Input */}
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</Label>
              <Input
                type="text"
                id="name"
                {...register('name', { required: "Name is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            {/* Username Input */}
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</Label>
              <Input
                type="text"
                id="username"
                {...register('username', { required: "Username is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.username && <span className="text-red-500">{errors.username.message}</span>}
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
              <Input
                type="password"
                id="password"
                {...register('password', { required: "Password is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.password && <span className="text-red-500 mt-2">{errors.password.message}</span>}
            </div>

            {/* Confirm Password Input */}
            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: "Confirm Password is required",
                  validate: value => value === password || "Passwords do not match"
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.confirmPassword && <span className="text-red-500 mt-2">{errors.confirmPassword.message}</span>}
            </div>

            {/* Submit Button */}
            <div>
              <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5b6081] hover:bg-[#4c5275] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </ToastProvider>
  );
};

export default UserDetailsForm;