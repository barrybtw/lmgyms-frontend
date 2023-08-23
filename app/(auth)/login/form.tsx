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

const FormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type SignUpSchemaType = z.infer<typeof FormSchema>;

export default function FormComponent() {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
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
              <FormItem className='my-4'>
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
              <FormItem className='my-4'>
                <FormLabel>Password</FormLabel>
                <FormDescription>
                  This is your password, make it strong!
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder='password'
                    type='password'
                    autoComplete='password'
                    name='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='my-6'>
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
