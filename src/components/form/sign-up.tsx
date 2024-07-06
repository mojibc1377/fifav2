'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Toast, ToastProvider } from '@radix-ui/react-toast';
import { toast, useToast } from '../ui/use-toast';
import { describe } from 'node:test';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
    phone: z.string().min(1,"Phone number is a must"),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    userName : z.string().min(1,"username is mandatory"),
    name : z.string().min(1,"name is mandatory"),
    lastName : z.string().min(1,"lastname is mandatory"),
});

const SignUpForm = () => {
  const {toast} = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      name:'',
      lastName : '',
      phone:'',
      userName:''
      
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.name,
        lastName: values.lastName,
        phone: values.phone,
        userName: values.userName
      })
    })
  if(response.ok){
    alert("User created successfully")
  
    router.push('/sign-in')
  }else{
    toast({
      title: 'Error.',
      description: "OoOps! Something went wrong",
      variant:"destructive"
    })
   
  }
}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tel</FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    placeholder='Enter your tel'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input
                  type='string'
                  placeholder='Enter your name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>lastName</FormLabel>
              <FormControl>
                <Input
                  type='string'
                  placeholder='Enter your lastName'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='userName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>userName</FormLabel>
              <FormControl>
                <Input
                  type='string'
                  placeholder='Enter your userName'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Sign up
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-2/3 items-center justify-evenly before:mr-4 before:block before:h-px  after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        
      </div>
    
      <p className='text-center text-sm text-gray-600 '>
        Already have an Account?
        <Link className='text-blue-500 hover:underline ml-1' href='/sign-in'>
          Sign in
        </Link>
      </p>

    </Form>
    

  );
};

export default SignUpForm;