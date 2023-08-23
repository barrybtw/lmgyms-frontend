'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const FormSchema = z
  .object({
    username: z.string().min(3).max(20),
    password: z.string().min(8),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

type SignUpSchemaType = z.infer<typeof FormSchema>;

export default function FormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    toast({
      title: 'Success',
      description: 'You have successfully signed up!',
    });

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='container flex flex-col justify-between max-w-xl'
        >
          <div>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='my-4 min-h-[123px]'>
                  <FormLabel>Username</FormLabel>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder='username'
                      autoComplete='username'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='my-4 min-h-[123px]'>
                  <FormLabel>Password</FormLabel>
                  <FormDescription>
                    This is your password, make it strong!
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder='password'
                      type='password'
                      autoComplete='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='repeatPassword'
              render={({ field }) => (
                <FormItem className='my-4 min-h-[123px]'>
                  <FormLabel>Password</FormLabel>
                  <FormDescription>
                    Repeat it one more time! Just to be safe
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder='repeat password'
                      type='password'
                      autoComplete='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type='submit'
            className='w-auto my-6 mr-auto'
            disabled={isSubmitting}
          >
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
}
