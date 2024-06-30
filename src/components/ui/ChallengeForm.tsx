"use client"
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { ToastProvider } from '@radix-ui/react-toast';



type ChallengeFormInputs = {
  gameType: string;
  consoleType: string;
  price: number;
};

const AddChallengeForm: React.FC = () => {
    const { toast } = useToast()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ChallengeFormInputs>();
  const [consoleType, setConsoleType] = useState("");

  const onSubmit: SubmitHandler<ChallengeFormInputs> = (data) => {
    console.log(data);
    toast({
        title: "Challenge Created",
        description: "Your new challenge has been successfully created.",
        duration: 3000,
      });
    
  };

  const handleConsoleChange = (value: string) => {
    setConsoleType(value);
    setValue('consoleType', value, { shouldValidate: true });
  };

  return (
    <ToastProvider>

    <Card className="w-full max-w-md mx-auto shadow-inner border-solid shadow-[#161e2b] border-[#161e2b] sliding-div-x">
      <CardHeader>
        <CardTitle className='background-muted'>Add New Challenge</CardTitle>
        <CardDescription>Fill out the form below to add a new challenge.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Game Type Radio Input */}
          <div>
            <Label className="my-4">Game Type</Label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  className="mr-1 custom-radio"
                  value="game1"
                  {...register('gameType', { required: true })}
                />
                Game 1
              </label>
              <label>
                <input
                  type="radio"
                  className="mr-1 custom-radio"
                  value="game2"
                  {...register('gameType', { required: true })}
                />
                Game 2
              </label>
              {errors.gameType && <span className="text-red-500 mt-2">This field is required</span>}
            </div>
          </div>

          {/* Console Type Dropdown */}
          <div>
            <Label className="my-4">Console Type</Label>
            <Select value={consoleType} onValueChange={handleConsoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select console" />
              </SelectTrigger>
              <SelectContent className='py-0.5'>
                <SelectItem value="console1">Ps4</SelectItem>
                <SelectItem value="console2">Ps5</SelectItem>
              </SelectContent>
            </Select>
            {errors.consoleType && <span className="text-red-500">This field is required</span>}
          </div>

          {/* Price Input */}
          <div>
            <Label className="my-4">Price (Coins)</Label>
            <Input
              type="number"
              {...register('price', { required: true, min: 10, max: 100 })}
              placeholder="Enter price"
            />
            {errors.price && <span className="text-red-500 mt-2">Price must be between 10 and 100 coins</span>}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#5b6081] hover:bg-[#4c5275] text-white">Add Challenge</Button>
        </form>
        
      </CardContent>

    </Card>
    <Toaster/>
    </ToastProvider>

  );
};

export default AddChallengeForm;