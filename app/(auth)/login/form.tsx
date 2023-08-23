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
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

const FormSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8),
});

type SignInSchemaType = z.infer<typeof FormSchema>;

export default function FormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);

    toast({
      title: 'Success',
      description: 'You have successfully logged in!',
    });
    console.log(data);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className='grid w-full h-full place-items-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='container max-w-xl my-auto'
        >
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
                  <Input placeholder='username' {...field} />
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
          <Button type='submit' className='my-6' disabled={isSubmitting}>
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
